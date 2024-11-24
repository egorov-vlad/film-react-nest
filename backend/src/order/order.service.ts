import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { AppConfig } from '../app.config.provider';
import { OrderDTO, TicketDTO } from './dto/order.dto';

import { FilmsMongoRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';

export interface IOrderResponse {
  total: number;
  items: TicketDTO[];
}

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsPostgresRepository: FilmsPostgresRepository,
    private readonly filmsMongoRepository: FilmsMongoRepository,
  ) {}

  async createOrder(order: OrderDTO): Promise<IOrderResponse> {
    const { tickets } = order;

    try {
      if (this.config.database.driver === 'postgres') {
        for (const ticket of tickets) {
          const { film, session, row, seat } = ticket;

          const filmDocument =
            await this.filmsPostgresRepository.findFilmById(film);

          if (!filmDocument) {
            throw new BadRequestException(`Film ${film} not found`);
          }

          const schedule = filmDocument.schedule.find(
            (schedule) => schedule.id === session,
          );

          if (!schedule) {
            throw new BadRequestException(`Schedule ${session} not found`);
          }

          const seatKey = `${row}:${seat}`;
          if (schedule.taken.includes(`${seatKey}`)) {
            throw new BadRequestException(`Seat ${seatKey} is already taken`);
          }

          if (!schedule.taken) {
            schedule.taken = seatKey;
          } else {
            schedule.taken += `,${seatKey}`;
          }

          await this.filmsPostgresRepository.updateTicket(filmDocument);
        }
      }

      if (this.config.database.driver === 'mongodb') {
        for (const ticket of tickets) {
          const { film, session, row, seat } = ticket;
          const filmDocument =
            await this.filmsMongoRepository.findFilmById(film);

          if (!filmDocument) {
            throw new BadRequestException(`Film ${film} not found`);
          }

          const schedule = filmDocument.schedule.find(
            (schedule) => schedule.id === session,
          );

          if (!schedule) {
            throw new BadRequestException(`Schedule ${session} not found`);
          }

          const seatKey = `${row}:${seat}`;
          if (schedule.taken.includes(`${seatKey}`)) {
            throw new BadRequestException(`Seat ${seatKey} is already taken`);
          }

          schedule.taken.push(seatKey);

          await filmDocument.updateOne({
            $set: {
              schedule: filmDocument.schedule,
            },
          });
        }
      }

      return {
        total: tickets.length,
        items: order.tickets.map((ticket) => ({ ...ticket })),
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}

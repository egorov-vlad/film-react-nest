import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(order: OrderDTO) {
    const { tickets } = order;
    try {
      for (const ticket of tickets) {
        const { film, session, row, seat } = ticket;
        const filmDocument = await this.filmsRepository.findFilmById(film);

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

      return {
        total: tickets.length,
        items: order.tickets.map((ticket) => ({ ...ticket })),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}

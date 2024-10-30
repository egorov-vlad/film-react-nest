import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film, Schedule } from '../films/films.schema';
import { FilmsDTO } from '../films/dto/films.dto';
import { GetScheduleDTO } from '../films/dto/schedule.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  mapFilmsToDTO(film: Film): FilmsDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule,
    };
  }

  mapScheduleToDTO(schedule: Schedule[]): GetScheduleDTO[] {
    return schedule.map((schedule) => {
      return {
        id: schedule.id,
        daytime: schedule.daytime,
        hall: schedule.hall,
        rows: schedule.rows,
        seats: schedule.seats,
        price: schedule.price,
        taken: schedule.taken,
      };
    });
  }

  async findScheduleByFilmId(id: string): Promise<GetScheduleDTO[] | null> {
    const film = await this.filmModel.findOne({ id: id });

    if (!film || !film.schedule) return null;

    return this.mapScheduleToDTO(film.schedule);
  }

  async findAll(): Promise<FilmsDTO[]> {
    const films = await this.filmModel.find({});

    return films.map((film) => this.mapFilmsToDTO(film));
  }

  async findFilmById(id: string) {
    return this.filmModel.findOne({ id });
  }
}

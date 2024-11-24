import { Controller, Get, Param } from '@nestjs/common';
import {
  FilmsService,
  IFindAllResponse,
  IFindByIdResponse,
} from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms(): Promise<IFindAllResponse> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string): Promise<IFindByIdResponse> {
    return this.filmsService.findById(id);
  }
}

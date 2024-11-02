//TODO описать DTO для запросов к /films
import { GetScheduleDTO } from './schedule.dto';

export class FilmsDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDTO[];
}

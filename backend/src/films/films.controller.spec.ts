import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockReturnValue({
          total: 1,
          items: [{ id: '1', title: 'test' }],
        }),
        findById: jest.fn().mockReturnValue({
          total: 1,
          items: [
            {
              id: '1',
              title: 'test',
              schedule: [{ id: '1', hall: 1 }],
            },
          ],
        }),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be return all films', async () => {
    const result = await controller.getFilms();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual({ total: 1, items: [{ id: '1', title: 'test' }] });
  });

  it('should be return film schedule by id', async () => {
    const result = await controller.getFilmSchedule('1');
    expect(service.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual({
      total: 1,
      items: [
        {
          id: '1',
          title: 'test',
          schedule: [{ id: '1', hall: 1 }],
        },
      ],
    });
  });
});

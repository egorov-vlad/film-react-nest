//TODO реализовать DTO для /orders
//TODO реализовать DTO для /orders
export class OrderDTO {
  email: string;
  phone: string;
  tickets: {
    day: string;
    daytime: string;
    film: string;
    price: number;
    row: number;
    seat: number;
    session: string;
    time: string;
  }[];
}

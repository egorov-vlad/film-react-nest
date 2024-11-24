//TODO реализовать DTO для /orders
export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}

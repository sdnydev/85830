import { Card } from './card.dto';

export class Swimlane {
  id!: string;
  name!: string;
  position!: number;
  cards!: Card[];
}

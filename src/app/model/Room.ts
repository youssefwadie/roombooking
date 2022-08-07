export class Room {
  id: number;
  name: string;
  location: string;
  capacities: Array<LayoutCapacity>;

  constructor() {
    this.capacities = new Array<LayoutCapacity>();
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;
}

export enum Layout {
  // name: keyof typeof
  THEATER= 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting',
}

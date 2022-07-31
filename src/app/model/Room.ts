export class Room {
  id: number;
  name: string;
  location: string;
  capacities: Array<LayoutCapacity>;

  constructor(id: number, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.capacities = new Array<LayoutCapacity>();
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;
  constructor(layout: Layout, capacity: number) {
    this.layout = layout;
    this.capacity = capacity;
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting',
}

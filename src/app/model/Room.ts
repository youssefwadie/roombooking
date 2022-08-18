import { TypeofExpr } from "@angular/compiler";

export class Room {
  id: number;
  name: string;
  location: string;
  capacities: Array<LayoutCapacity>;

  constructor() {
    this.capacities = new Array<LayoutCapacity>();
  }
  
  static fromHttp(room: Room): Room {
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    for(const lc of room.capacities) {
      newRoom.capacities.push(LayoutCapacity.fromHttp(lc));
    }
    return newRoom;
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;
  static fromHttp(layoutCapacity: LayoutCapacity): LayoutCapacity {
    const lc = new LayoutCapacity();
    lc.capacity = layoutCapacity.capacity;
    lc.layout = Layout[layoutCapacity.layout as string as keyof typeof Layout];
    return lc;  
  }
}

export enum Layout {
  // name: keyof typeof
  THEATER= 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting',
}

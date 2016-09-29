/* tslint:disable */

export interface RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  data: any;
  location: string;
  deviceId: string;
  id?: any;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  data: any;
  location: string;
  deviceId: string;
  id: any;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}

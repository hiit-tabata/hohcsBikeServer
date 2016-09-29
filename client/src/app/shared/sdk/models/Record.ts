/* tslint:disable */

export interface RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  id?: any;
  dataSamples?: any;
  data?: Array<any>;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  id: any;
  dataSamples: any;
  data: Array<any>;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}

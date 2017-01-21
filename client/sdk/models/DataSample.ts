/* tslint:disable */

export interface DataSampleInterface {
  dateTime: any;
  sensorType: string;
  bleAddress?: string;
  value: number;
  sensorId?: string;
  id?: any;
  recordId?: any;
}

export class DataSample implements DataSampleInterface {
  dateTime: any;
  sensorType: string;
  bleAddress: string;
  value: number;
  sensorId: string;
  id: any;
  recordId: any;
  constructor(instance?: DataSample) {
    Object.assign(this, instance);
  }
}

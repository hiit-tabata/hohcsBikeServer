/* tslint:disable */
import {
  DataSample,
  Client,
  Tag
} from '../index';

export interface RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  remarks?: string;
  valid?: boolean;
  processed?: boolean;
  data?: string;
  dataTypes?: string;
  sensorIds?: string;
  bleAddress?: string;
  id?: any;
  clientId?: any;
  tagId?: any;
  dataSamples?: Array<DataSample>;
  client?: Client;
  tags?: Array<Tag>;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  remarks: string;
  valid: boolean;
  processed: boolean;
  data: string;
  dataTypes: string;
  sensorIds: string;
  bleAddress: string;
  id: any;
  clientId: any;
  tagId: any;
  dataSamples: Array<DataSample>;
  client: Client;
  tags: Array<Tag>;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}

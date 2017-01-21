/* tslint:disable */
import {
  Record
} from '../index';

export interface TagInterface {
  key: string;
  id?: any;
  recordId?: any;
  records?: Array<Record>;
}

export class Tag implements TagInterface {
  key: string;
  id: any;
  recordId: any;
  records: Array<Record>;
  constructor(instance?: Tag) {
    Object.assign(this, instance);
  }
}

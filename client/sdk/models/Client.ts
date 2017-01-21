/* tslint:disable */
import {
  Record
} from '../index';

export interface ClientInterface {
  centerId?: string;
  remarks?: string;
  realm?: string;
  username?: string;
  password: string;
  challenges?: any;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  created?: any;
  lastUpdated?: any;
  id?: any;
  accessTokens?: Array<any>;
  records?: Array<Record>;
}

export class Client implements ClientInterface {
  centerId: string;
  remarks: string;
  realm: string;
  username: string;
  password: string;
  challenges: any;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  status: string;
  created: any;
  lastUpdated: any;
  id: any;
  accessTokens: Array<any>;
  records: Array<Record>;
  constructor(instance?: Client) {
    Object.assign(this, instance);
  }
}

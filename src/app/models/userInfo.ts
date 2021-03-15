import {Address} from './address-interface';
import {Telephone} from './telephone';
import {Device} from './device-interface';

export class UserInfo {
    lastName?: string;
    firstName?: string;
    gender?: string;
    telephones?: Telephone[];
    devices?: Device[];
    address?: Address;
    subscription: any;
    constructor() {
      this.telephones = [];
      this.devices = [];
      this.address = new Address();
    }
}

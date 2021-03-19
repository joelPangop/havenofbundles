import {UserInfo} from './userInfo';
import {RoleType} from './roleType';
import {File} from './file';
import {Address} from "./address-interface";

export class User {
  role?: RoleType;
  username: string;
  email ?: string;
  avatar ?: File;
  type ?: string;
  password ?: string;
  userInfo?: UserInfo;
  birthday: string;
  shipping_addr?: Address;
  customer_profile?: any;
  payment_account?: any;
  subscription?: Subscription;
  bank_account?: any[];
  _id ?: string;
  constructor() {
    this.avatar = new File();
    this.userInfo = new UserInfo();
    this.shipping_addr = new Address();
    // this.birthday = new Date().toISOString()
  }
}

export class Currency {
  currency: string;
  icon: string;
  constructor() {
  }
}

export class Bank {
  bank_account?: any;
  appartNumber: string;
  constructor() {
  }
}

export class Subscription {
  type: string;
  payment_type: string;
  subscription_plan: any;
  constructor() {
  }
}

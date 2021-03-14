import {UserInfo} from './userInfo';
import {RoleType} from './roleType';
import {File} from './file';

export class User {
  role?: RoleType;
  username: string;
  email ?: string;
  contact?: string;
  avatar ?: File;
  type ?: string;
  password ?: string;
  userInfo?: UserInfo;
  birthday: string;
  currency?: Currency;
  customer_profile?: any;
  payment_account?: any;
  subscription?: Subscription;
  bank_account?: any[];
  verified?: boolean;
  _id ?: string;
  constructor() {
    this.avatar = new File();
    this.userInfo = new UserInfo();
    this.birthday = new Date().toISOString()
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

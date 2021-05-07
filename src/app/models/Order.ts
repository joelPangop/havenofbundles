import {OrderStatus} from './OrderStatus';
import {ItemCart} from './ItemCart';
import {UserInfo} from './userInfo';

export class Order {
  _id: string;
  userId: string;
  num_commande?: number;
  itemsCart: ItemCart[];
  quantity: number;
  amount: number;
  completed: boolean;
  status?: OrderStatus;
  trackingNumber?: string;
  shipmentFee: number;
  createdAt: Date;
  updatedAt: Date;
  checkout_infos: any;
  userInfo: UserInfo;
  paymentIntent:any;
  orders:any[];
}

import {ItemStatus} from './ItemStatus';
import {Extra, Product, Rate} from './Product';

export class ItemCart {
  _id?: string;
  product: Product;
  qty: number;
  amount: number;
  status: ItemStatus;
  order?: any;
  addButtonState: string;
  length: number;
  can_extra?: boolean;
  extra?: Extra = new Extra();
  color?: string;

  constructor() {
    this.product = new Product();
    this.qty = 0;
    this.amount = 0;
    this.addButtonState = 'idle'
  }
}

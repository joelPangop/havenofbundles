import {Rate} from './Product-interface';

export class BundleSet {
  _id: string;
  title: string;
  features: Rate[];
  productId: string;
  price: number;
  supplement: any;
  constructor() {
    this.features = [];
  }
}

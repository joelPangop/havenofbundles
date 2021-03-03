import {Rate} from './Product-interface';

export class BundleSet {
  _id: string;
  title: string;
  features: BundleSetRate[];
  productId: string;
  price: number;
  supplement: Supplement;
  constructor() {
    this.features = [];
    this.supplement = {} as Supplement;
  }
}

export class Supplement {
  summary: String;
  quantity: number;
  price: number;
}

export class BundleSetRate {
  rate: Rate;
  quantity: number;
  constructor() {
    this.rate = new Rate();
  }
}

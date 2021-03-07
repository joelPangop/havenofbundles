import {Product, Rate} from './Product-interface';

export class BundleSet {
  _id: string;
  title: string;
  features: BundleSetRate[];
  pictures?: string[];
  product: Product;
  category: string;
  price: number;
  supplement: Supplement;
  constructor() {
    this.features = [];
    this.supplement = {} as Supplement;
  }
}

export class Supplement {
  title: string;
  summary: string;
  quantity: number;
  price: number;
}

export class BundleSetRate {
  rate: Rate;
  quantity: number;
  constructor() {
    this.rate = new Rate();
    this.quantity = 1;
  }
}

import {Product, Rate} from './Product';
import {Article} from './Article';

export class BundleSet extends Article{
  _id: string;
  title: string;
  features: BundleSetRate[];
  product: Product;
  price: number;
  supplement: Supplement;

  constructor() {
    super();
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

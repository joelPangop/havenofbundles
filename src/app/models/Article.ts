import {Extra} from './Product';

export class Article{
  likes?: string[];
  category: string;
  pictures?: string[];
  averageStar?: number;
  rates: Rate[];

  constructor() {
    this.rates = [] as Rate[];
  }
}

export class Rate {
  price: number;
  discountPrice?: number;
  price_discounted?: boolean;
  price_changed_date?: number;
  length: number;
  quantity: number;
  can_extra?: boolean;
  extra?: Extra = new Extra();
}

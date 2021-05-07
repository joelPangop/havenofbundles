import {Article} from './Article';

export class Product extends Article {
  _id: string;
  name: string;
  description?: Description;
  hairInfo?: HairInfo;
  origin?: string;
  rates: Rate[];
  bundle_category?: string;
  clos_front_category: string;
  style?: string;
  colors?: string[];
  sizes?: string[];
  available?: boolean;
  care?: Care;
  userId: string;

  constructor() {
    super();
    this.care = new Care();
    this.rates = [] as Rate[];
    this.hairInfo = new HairInfo();
    this.description = new Description();
  }
}

export class Description {
  description?: string;
  hair_type?: string;
  model_wearing?: string;
  available_service?: string;
}

export class HairInfo {
  unit_weight?: string;
  hair_quality?: string;
  hair_origin?: string;
  hair_weft_type?: string;
  features?: string;
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

export class Extra {
  price: number;
  motif: string;
}

export class Care {
  maintenance_level?: string;
  can_it_be_dyed?: string;
}

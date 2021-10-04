import Tag from '../infra/typeorm/entities/Tag';

export default interface ICreateProductDTO {
  name: string;
  price: number;
  inventory: number;
  productTags: Tag[];
  created_by: string;
}

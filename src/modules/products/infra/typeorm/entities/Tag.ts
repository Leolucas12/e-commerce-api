import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn()
  title: string;

  @ManyToMany(() => Product, (products) => products.tags)
  @JoinTable()
  products: Product[];
}

export default Tag;

import Tag from '@modules/products/infra/typeorm/entities/Tag';

export default interface IUsersRepository {
  create(title: string): Promise<Tag>;
  findByTitle(title: string): Promise<Tag | undefined>;
}

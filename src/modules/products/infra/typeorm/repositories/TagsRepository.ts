import Tag from '@modules/products/infra/typeorm/entities/Tag';
import ITagsRepository from '@modules/products/repositories/ITagsRepository';
import { getRepository, Repository } from 'typeorm';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async create(title: string): Promise<Tag> {
    const tag = this.ormRepository.create({ title });

    await this.ormRepository.save(tag);

    return tag;
  }

  public async findByTitle(title: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({ where: { title } });

    return tag;
  }
}

export default TagsRepository;

import ITagsRepository from '@modules/products/repositories/ITagsRepository';
import { inject, injectable } from 'tsyringe';
import Tag from '../infra/typeorm/entities/Tag';

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute(tagTitles: string[]): Promise<Tag[]> {
    const createdTags: Tag[] = [];

    for (let i = 0; i < tagTitles.length; i++) {
      const tagExists = await this.tagsRepository.findByTitle(tagTitles[i]);

      if (tagExists) {
        createdTags.push(tagExists);
      } else {
        const createdTag = await this.tagsRepository.create(tagTitles[i]);
        createdTags.push(createdTag);
      }
    }

    return createdTags;
  }
}

export default CreateTagService;

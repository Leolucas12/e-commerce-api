import { injectable } from 'tsyringe';
import Tag from '../../infra/typeorm/entities/Tag';

@injectable()
class FormatTagService {
  constructor() { }

  execute(tags: Tag[] | undefined): string[] {
    if (tags === undefined)
      return [];

    const tagsValue: string[] = [];

    tags.map((tag) => {
      const tagValue = Object.values(tag)[0] as string;
      tagsValue.push(tagValue);
    });

    return tagsValue;
  }
}

export default FormatTagService;

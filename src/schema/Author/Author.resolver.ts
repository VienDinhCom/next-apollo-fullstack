import { filter } from 'lodash';
import { posts } from '../../datasources/data';

export class Author {
  posts(author: any) {
    return filter(posts, { authorId: author.id });
  }
}

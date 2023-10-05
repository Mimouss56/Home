import { INews, ITag } from '../../../@types/news';

const mockTags: ITag[] = [
  { id: 1, label: 'Breaking', color: 'red' },
  { id: 2, label: 'Important', color: 'blue' },
  // ... other mock tags
];

const mockRole = {
  id: 1,
  label: 'Admin',
};

const mockAuthor = {
  id: 1,
  username: 'John Doe',
  email: 'john@doe.com',
  created_at: '2023-08-10T12:00:00Z',
  updated_at: '2023-08-11T12:00:00Z',
  last_visited: '2023-08-11T12:00:00Z',
  child: false,
  role: mockRole,
};
const mockNews: INews[] = [
  {
    id: 1,
    title: 'Sample News 1',
    author: mockAuthor,
    content: 'Test content',
    tags: mockTags,
    created_at: '2023-08-10T12:00:00Z',
    updated_at: '2023-08-11T12:00:00Z',
  },
];

export {
  mockNews,
  mockTags,
};

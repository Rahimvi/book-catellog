export const bookFilterableFields: string[] = [
  'searchTerm',
  'categoryId',
  'email',
  'contactNo',
  'genre',
  'title',
  'author',
];

export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};

export type IBookFilterRequest = {
  searchTerm?: string | undefined;
  title?: string;
  author?: string;
  price?: number;
  genre?: string;
  publicationDate?: string;
  createdAt?: string;
};

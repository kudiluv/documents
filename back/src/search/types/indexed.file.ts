import { Categories } from 'src/category/types/categories';

export type IndexedFile = {
  mimetype: string;
  type: Categories;
  link: string;
  text: string;
  originalName: string;
  uploadedDate: Date;
};

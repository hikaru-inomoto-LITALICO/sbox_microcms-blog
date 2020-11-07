declare type Post = {
  id: string;
  publishedAt: Date;
  title: string;
  body: string;
  author: Author;
  tags?: Tag[];
  footNotes?: FootNote[];
};

declare type Author = {
  id: string;
  name: string;
  picture: string;
  description: string;
};

declare type Tag = {
  id: string;
  title: string;
};

declare type FootNote = {
  index: number;
  content: string;
};

declare type Post = {
  id: string;
  publishedAt: Date;
  title: string;
  description: string;
  visual: string; // url
  categories?: Category[];
  contents: (Section | Image)[];
  supervisors?: Supervisor[];
};

declare type Supervisor = {
  id: string;
  name: string;
  picture?: string;
  description?: string;
};

declare type Category = {
  id: string;
  title: string;
};

declare type Section = {
  type: "section";
  html: string;
};

declare type Image = {
  type: "image";
  src: string; // url
  alt: string;
};

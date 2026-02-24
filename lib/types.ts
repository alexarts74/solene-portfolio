export interface Photo {
  src: string;
  thumbSrc: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Gallery {
  slug: string;
  title: string;
  photos: Photo[];
}

export interface Collection {
  slug: string;
  title: string;
  description?: string;
  coverPhoto?: string;
  galleries: Gallery[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  coverPhoto: string;
  photos: Photo[];
}

export interface Print {
  slug: string;
  title: string;
  photo: string;
  format: string;
  paper: string;
  edition: string;
  price: number;
  description: string;
}

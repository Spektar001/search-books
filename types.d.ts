interface RootBook {
  kind: string;
  totalItems: number;
  items: BookItem[];
}

interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface SearchValues {
  searchValue: string;
  category: string;
  order: string;
  startIndex: number;
}

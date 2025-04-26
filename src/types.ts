export interface Image {
  id: string;
  color: string;
  alt_description: string;
  description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
}

export interface Contract {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  features: string;
  imageAlt: string;
  imageData?: string;
  imageFileName?: string;
  imageContentType?: string;
  createdAt: string;
  imageSrc?: string; // For frontend display
}
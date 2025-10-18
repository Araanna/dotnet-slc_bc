export interface ContractFeature {
  Text: string;
  Indent?: number;
}

export interface Contract {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  features: string;
  imageAlt: string;
  imageData: string;
  imageFileName: string;
  imageContentType: string;
  createdAt: string;
}

export interface ContractData {
  contracts: Contract[];
}
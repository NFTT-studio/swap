export interface Work {
  tokenId: number;
  name: string;
  url?: string;
  status: number;
  address: string;
  description: string;
  metadata: string;
  externalLinks: string;
  price?: number | string;
  latestPrice?: number;
  categoryId: number;
  classId: number;
  createdAt: string;
  updatedAt: string;
  owner: string;
  data?: WorkData;
  pledge?: string;
}

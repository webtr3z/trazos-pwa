export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
  customFields: Record<string, any>;
}

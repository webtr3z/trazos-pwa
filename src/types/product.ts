export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
  customFields: Record<string, any>;
  tokenId?: string;
  transactionHash?: string;
  metadataUri?: string;
  mintingStatus?: "pending" | "submitted" | "confirmed" | "failed";
}

export interface ProductNft {
  name: string;
  image: string;
  description: string;
  attributes: Record<string, any>;
}

export type MintParams =
  | string
  | {
      [x: string]: unknown;
      name?: string | undefined;
      description?: string | undefined;
      image?: string | undefined;
      animation_url?: string | undefined;
      external_url?: string | undefined;
      background_color?: string | undefined;
      properties?:
        | (Record<string, unknown> | Array<Record<string, unknown>>)
        | undefined;
    };

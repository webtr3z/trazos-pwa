import { contract } from "@/services/thirdweb/client";
import { ProductNft } from "@/types/product";
import { mintTo } from "thirdweb/extensions/erc721";

export const mintProduct = async (
  recepientAddress: string,
  productData: ProductNft,
) => {
  try {
    const tx = mintTo({
      contract,
      to: recepientAddress,
      nft: productData as any,
    });

    return tx;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

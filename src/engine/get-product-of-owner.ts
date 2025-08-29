import { contract } from "@/services/thirdweb/client";
import { readContract } from "thirdweb";

export const getProductOfOwner = async (owner: string, tokenId: string) => {
  const data = await readContract({
    contract,
    method:
      "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    params: [owner, BigInt(tokenId)],
  });

  console.log(data);

  return data;
};

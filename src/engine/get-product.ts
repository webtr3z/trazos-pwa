import { contract } from "@/services/thirdweb/client";
import { readContract } from "thirdweb";

export const getProduct = async (tokenId: string) => {
  const data = await readContract({
    contract,
    method: "function tokenURI(uint256 _tokenId) view returns (string)",
    params: [BigInt(tokenId)],
  });

  return data;
};

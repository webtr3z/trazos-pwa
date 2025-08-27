import { contract } from "@/services/thirdweb/client";
import { readContract } from "thirdweb";

export const nextTokenToMint = async () => {
  const data = await readContract({
    contract,
    method: "function nextTokenIdToMint() view returns (uint256)",
    params: [],
  });

  return data;
};

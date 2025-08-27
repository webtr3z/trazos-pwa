import { contract } from "@/services/thirdweb/client";
import { readContract } from "thirdweb";

export const getTotalSupply = async () => {
  return await readContract({
    contract,
    method: "function totalSupply() view returns (uint256)",
    params: [],
  });
};

import { client } from "@/services/thirdweb/client";
import { defineChain, getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { baseSepolia } from "thirdweb/chains";

export const hasAccess = async (adddress: string): Promise<boolean> => {
  try {
    const quantityRequired = 1n;

    const contract = getContract({
      client: client,
      chain: baseSepolia,
      address: "0x6c709808460bD2510A0f082B0e40dE8560f13bd1",
    });

    const ownedBalance = await balanceOf({
      contract: contract,
      owner: adddress,
    });

    return ownedBalance >= quantityRequired;
  } catch (error) {
    console.error("[🔒hasAccess] error", error);
    return false;
  }
};

import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const contractAddress: string = process.env
  .NEXT_PUBLIC_THIRDWEB_DEPLOYED_CONTRACT_ADDRESS as string;

if (!clientId || !contractAddress) {
  throw new Error("No client ID or contract address provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  address: contractAddress,
  chain: baseSepolia,
  client,
});

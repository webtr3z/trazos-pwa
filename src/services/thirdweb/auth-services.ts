import { client } from "@/services/thirdweb/client";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

const privateKey = process.env.NEXT_PUBLIC_ADMIN_WALLET_PRIVATE_KEY || "";
const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN || "";

if (!privateKey || !domain) {
  throw new Error(
    "NEXT_PUBLIC_ADMIN_WALLET_PRIVATE_KEY or NEXT_PUBLIC_AUTH_DOMAIN is not set",
  );
}

export const thirdwebAuth = createAuth({
  domain: domain,
  adminAccount: privateKeyToAccount({
    client: client,
    privateKey: privateKey,
  }),
});

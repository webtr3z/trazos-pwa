"use client";

import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth";
import { client } from "@/services/thirdweb/client";
import { Wallet } from "lucide-react";
import { ConnectButton } from "thirdweb/react";

export const LoginButton = () => {
  return (
    <ConnectButton
      locale="es_ES"
      connectButton={{
        label: "Conectar Wallet",
      }}
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          return isLoggedIn();
        },
        doLogin: async (params) => {
          return login(params);
        },
        doLogout: async () => {
          return await logout();
        },
        getLoginPayload: async ({ address }) => {
          return generatePayload({ address });
        },
      }}
    />
  );
};

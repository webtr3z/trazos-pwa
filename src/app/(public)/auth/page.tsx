"use server";

import { hasAccess } from "@/actions/conditions";
import { Access } from "@/components/auth/access";
import { GatedContent } from "@/components/auth/gated-content";
import { MustLogin } from "@/components/auth/must-login";
import { AuthCard } from "@/components/cards/auth-card";
import { thirdwebAuth } from "@/services/thirdweb/auth-services";
import { cookies } from "next/headers";

export default async function GatedContentPage() {
  const jwt = (await cookies()).get("jwt")?.value;

  console.log("jwt", (await cookies()).get("jwt"));
  // console.log("isLoggedIn", await isLoggedIn());

  if (!jwt) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AuthCard>
          <MustLogin />
        </AuthCard>
      </div>
    );
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt });

  console.log("authResult", authResult);

  if (!authResult.valid) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AuthCard>
          <MustLogin />
        </AuthCard>
      </div>
    );
  }

  const address = authResult.parsedJWT.sub;

  console.log("address", address);

  if (!address) {
    throw new Error("No address found in JWT");
  }

  const _hasAccess = await hasAccess(address);

  console.log("hasAccess", _hasAccess);

  if (!_hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AuthCard>
          <Access />
        </AuthCard>
      </div>
    );
  }

  return <GatedContent />;
}

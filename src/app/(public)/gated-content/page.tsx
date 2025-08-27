import { hasAccess } from "@/actions/conditions";
import { Button } from "@/components";
import { thirdwebAuth } from "@/services/thirdweb/auth-services";
import { getCookie } from "cookies-next";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { GatedContent } from "./content";

const MustLogin = () => {
  return (
    <div className="flex flex-col min-h-[100vh] tems-center justify-center p-4 text-center">
      <p>No has iniciado sesión</p>
      <Link href="/auth">
        <Button size="xl">Iniciar sesión</Button>
      </Link>
    </div>
  );
};

const NoAccess = () => {
  return (
    <div className="flex flex-col min-h-[100vh] tems-center justify-center p-4 text-center">
      <p>No tienes el NFT para acceder a este contenido</p>
      <Link href="/mint-nft">
        <Button size="xl">
          <span>Mintar NFT</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};

export default async function GatedContentPage() {
  const jwt = getCookie("jwt") as string;

  if (!jwt) {
    return <MustLogin />;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt });

  if (!authResult.valid) {
    return <MustLogin />;
  }

  const address = authResult.parsedJWT.sub;

  if (!address) {
    throw new Error("No address found in JWT");
  }

  const _hasAccess = await hasAccess(address);

  if (!_hasAccess) {
    return <NoAccess />;
  }

  return <GatedContent />;
}

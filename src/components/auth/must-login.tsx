import Link from "next/link";
import { LoginButton } from "./login-button";

export const MustLogin = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <Link href="/auth">
        <LoginButton />
      </Link>
    </div>
  );
};

"use server";
import { thirdwebAuth } from "@/services/thirdweb/auth-services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  type GenerateLoginPayloadParams,
  type VerifyLoginPayloadParams,
} from "thirdweb/auth";

export async function generatePayload(payload: GenerateLoginPayloadParams) {
  return thirdwebAuth.generatePayload(payload);
}

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    const c = await cookies();
    // * Set expiration one day duration
    c.set("jwt", jwt, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

    // * Test expiration one minute duration
    // c.set("jwt", jwt, {
    //   expires: new Date(new Date().getTime() + 1 * 60 * 1000),
    // });
    console.log("[🔓login] jwt", jwt);
    // redirect to the dashboard home page
    //return redirect("/dashboard/home");
  }
}

export async function isLoggedIn() {
  const c = await cookies();
  const jwt = c.get("jwt");

  if (!jwt?.value) {
    // redirect("/jwt-cookie");
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });

  if (!authResult.valid) {
    // redirect("/jwt-cookie");
    return false;
  }

  //   return authResult.parsedJWT;
  return true;
}

export async function logout() {
  try {
    const c = await cookies();
    c.delete("jwt");
    console.log("[🔒logout]", c.get("jwt"));
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
}

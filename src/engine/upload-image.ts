import { client } from "@/services/thirdweb/client";
import { upload } from "thirdweb/storage";

export const uploadImage = async (image: File) => {
  const uri = await upload({
    client,
    files: [image],
  });

  return uri;
};

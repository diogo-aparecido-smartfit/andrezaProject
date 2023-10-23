import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function updateSocialMedia(req: Request, res: Response) {
  try {
    const { name, address, whatsapp, instagram } = req.body;

    // delete old socialmedia
    const socialMediaRef = db.collection("socialMedia").doc("socialMedia");
    const doc = (await socialMediaRef.get()).data();

    if (!doc) {
      console.log("Documento não encontrado! Criando documento...");
      try {
        const socialMedia = {
          name: " ",
          address: " ",
          whatsapp: " ",
          instagram: "",
        };
        await db.collection("socialMedia").doc("socialMedia").set(socialMedia);
        return res.sendStatus(201);
      } catch {
        return res.sendStatus(404);
      }
    }

    const socialMedia = {
      name: name ? name : doc?.name,
      address: address ? address : doc?.address,
      instagram: instagram ? instagram : doc?.instagram,
      whatsapp: whatsapp ? whatsapp : doc?.whatsapp,
    };

    await socialMediaRef.delete();

    // create new doc
    await db.collection("socialMedia").doc("socialMedia").set(socialMedia);

    return res.sendStatus(204);
  } catch (error) {
    return console.log("Erro ao atualizar categoria!");
  }
}

import { db, bucket } from "../../util/admin";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export async function createSocialMedia(req: Request, res: Response) {
  try {
    const { name, address, whatsapp, instagram } = req.body;

    if (!name) {
      console.log("Campos indefinidos encontrados.");
      return res.sendStatus(400);
    }

    const socialMediaRef = db.collection("socialMedia").doc("socialMedia");

    if ((await socialMediaRef.get()).data()) {
      console.log(
        "Você não pode criar outras redes sociais pois elas já existem!"
      );
      return res.sendStatus(409);
    }

    const socialMedia = {
      name,
      address,
      whatsapp,
      instagram,
    };

    await db.collection("socialMedia").doc("socialMedia").set(socialMedia);
    return res.status(201).json(socialMedia);
  } catch (error) {
    return console.log("Erro ao criar redes sociais!", error);
  }
}

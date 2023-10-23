import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import path from "path";

export async function deleteSocialMedia(req: Request, res: Response) {
  try {
    const socialMediaRef = db.collection("socialMedia").doc("socialMedia");
    const doc = (await socialMediaRef.get()).data();

    if (!doc) {
      console.log("Rede Social não encontrada!");
      return res.sendStatus(404);
    }

    const deleteDoc = await socialMediaRef.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao deletar social Media!");
    return res.sendStatus(500);
  }
}

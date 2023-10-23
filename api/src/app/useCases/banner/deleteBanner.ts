import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import path from "path";

export async function deleteBanner(req: Request, res: Response) {
  try {
    const bannerRef = db.collection("banner").doc("banner");

    const doc = (await bannerRef.get()).data();

    if (!doc) {
      console.log("Banner não encontrado!");
      return res.sendStatus(404);
    }

    const deleteDoc = await bannerRef.delete();

    if (!bucket.file(doc?.image).name) {
      return res.sendStatus(204);
    }

    if (doc?.image) {
      const imageUrl = bucket.file(doc.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("banner/" + imageName).delete();
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao deletar banner!", error);
    return res.sendStatus(500);
  }
}

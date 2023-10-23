import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import path from "path";

export async function deleteStyles(req: Request, res: Response) {
  try {
    const { styleId } = req.params;

    const styleRef = db.collection("styles").doc(styleId);
    const doc = (await styleRef.get()).data();

    if (!doc) {
      console.log("Estilo não encontrado!");
      return res.sendStatus(404);
    }

    const deleteDoc = await styleRef.delete();

    if (!bucket.file(doc?.image).name) {
      return res.sendStatus(204);
    }

    if (doc?.image) {
      const imageUrl = bucket.file(doc.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("styles/" + imageName).delete();
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao deletar estilo!");
    return res.sendStatus(500);
  }
}

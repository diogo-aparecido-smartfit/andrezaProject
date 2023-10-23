import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import path from "path";

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    const productRef = db.collection("products").doc(productId);

    const doc = (await productRef.get()).data();

    if (!doc) {
      console.log("Produto não encontrado!");
      return res.sendStatus(404);
    }

    const deleteDoc = await productRef.delete();

    if (!bucket.file(doc?.image).name) {
      return res.sendStatus(204);
    }

    if (doc?.image) {
      const imageUrl = bucket.file(doc.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("products/" + imageName).delete();
    }

    return res.sendStatus(204);
  } catch (error) {
    return console.log("Erro ao deletar produto!");
  }
}

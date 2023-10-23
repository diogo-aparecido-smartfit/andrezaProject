import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import path from "path";

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    const categoryRef = db.collection("categories").doc(categoryId);
    const doc = (await categoryRef.get()).data();

    if (!doc) {
      console.log("Categoria não encontrada!");
      return res.sendStatus(404);
    }

    const deleteDoc = await categoryRef.delete();

    if (!bucket.file(doc?.image).name) {
      return res.sendStatus(204);
    }

    if (doc?.image) {
      const imageUrl = bucket.file(doc.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("categories/" + imageName).delete();
    }

    return res.sendStatus(204);
  } catch (error) {
    return console.log("Erro ao deletar categoria!");
  }
}

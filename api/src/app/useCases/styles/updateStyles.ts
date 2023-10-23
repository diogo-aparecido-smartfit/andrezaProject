import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function updateStyles(req: Request, res: Response) {
  try {
    const { id, name } = req.body;
    const { styleId } = req.params;
    const imageFile = req.file;

    // verify if name and id exists
    if (!name) {
      res.status(400).send("O nome do estilo é obrigatório.");
      return;
    }

    // delete old style
    const styleRef = db.collection("styles").doc(styleId);
    const doc = (await styleRef.get()).data();

    if (!doc) {
      console.log("Estilo não encontrada!");
      return res.sendStatus(404);
    }

    if (imageFile) {
      const imageUrl = bucket.file(doc?.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("styles/" + imageName).delete();
    }

    // update values
    const filePath = `styles/${uuidv4()}-${imageFile?.originalname}`;
    const bucketFile = bucket.file(filePath);

    // save the new image
    if (imageFile) {
      await bucketFile.save(imageFile.buffer, {
        metadata: {
          contentType: imageFile?.mimetype,
        },
      });
    }

    // create image Url
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filePath)}?alt=media`;

    const style = {
      id: id ? id : doc?.id,
      name: name ? name : doc?.name,
      image: imageFile ? imageUrl : doc?.image,
    };

    await styleRef.delete();

    // create new doc
    await db.collection("styles").doc(style.id).set(style);

    return res.sendStatus(204);
  } catch (error) {
    return console.log("Erro ao atualizar Estilo!");
  }
}

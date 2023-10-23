import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function updateBanner(req: Request, res: Response) {
  try {
    const { title, subtitle } = req.body;
    const imageFile = req.file;

    // verify if name exists
    if (!title) {
      res.status(400).send("O título é obrigatório.");
      return;
    }

    // delete old banner
    const bannerRef = db.collection("banner").doc("banner");
    const doc = (await bannerRef.get()).data();

    if (!doc) {
      console.log("Banner não encontrado!");
      return res.sendStatus(404);
    }

    if (imageFile) {
      const imageUrl = bucket.file(doc?.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("banner/" + imageName).delete();
    }

    // update values
    const filePath = `banner/${uuidv4()}-${imageFile?.originalname}`;
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

    const banner = {
      title: title ? title : doc?.title,
      subtitle: subtitle ? subtitle : doc?.subtitle,
      image: imageFile ? imageUrl : doc?.image,
    };

    await bannerRef.delete();

    // create new doc
    await db.collection("banner").doc("banner").set(banner);

    return res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao atualizar banner!", error);
    return res.sendStatus(500);
  }
}

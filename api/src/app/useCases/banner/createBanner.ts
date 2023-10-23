import { db, bucket } from "../../util/admin";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export async function createBanner(req: Request, res: Response) {
  try {
    const { title, subtitle } = req.body;
    const imageFile = req.file;

    const bannerRef = db.collection("banner").doc("banner");

    if ((await bannerRef.get()).data()) {
      console.log("Você não pode criar outro banner pois um já existe!");
      return res.sendStatus(409);
    }

    if (!title) {
      res.status(400).send("O título é obrigatório!");
      return;
    } else if (!subtitle) {
      res.status(400).send("O subtítulo é obrigatório!");
      return;
    } else if (!imageFile) {
      return res.status(400).send("Nenhum arquivo carregado.");
    }

    const filePath = `banner/${uuidv4()}-${imageFile?.originalname}`;
    const bucketFile = bucket.file(filePath);

    await bucketFile.save(imageFile.buffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filePath)}?alt=media`;

    const banner = {
      title,
      subtitle,
      image: imageUrl,
    };

    await db.collection("banner").doc("banner").set(banner);
    return res.status(201).json(banner);
  } catch (error) {
    console.log("Erro ao criar banner!", error);
    return res.sendStatus(500);
  }
}

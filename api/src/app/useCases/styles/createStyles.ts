import { db, bucket } from "../../util/admin";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export async function createStyles(req: Request, res: Response) {
  try {
    const { id, name } = req.body;
    const imageFile = req.file;

    if (!name) {
      res.status(400).send("O nome do estilo é obrigatório.");
      return;
    } else if (!id) {
      res.status(400).send("O id do estilo é obrigatório.");
      return;
    } else if (!imageFile) {
      return res.status(400).send("Nenhum arquivo carregado.");
    }

    const filePath = `styles/${uuidv4()}-${imageFile?.originalname}`;
    const bucketFile = bucket.file(filePath);

    await bucketFile.save(imageFile.buffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filePath)}?alt=media`;

    const style = {
      id,
      name,
      image: imageUrl,
    };

    await db.collection("styles").doc(style.id).set(style);
    return res.status(201).json(style);
  } catch (error) {
    return console.log("Erro ao criar estilo!");
  }
}

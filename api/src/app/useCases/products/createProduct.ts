import { db, bucket } from "../../util/admin";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export async function createProduct(req: Request, res: Response) {
  try {
    const { id, name, category, idCategory, style, idStyle, price } = req.body;
    const imageFile = req.file;

    if (!name) {
      res.status(400).send("O nome da categoria é obrigatório.");
      return;
    } else if (!id) {
      res.status(400).send("O id da categoria é obrigatório.");
      return;
    } else if (!imageFile) {
      return res.status(400).send("Nenhum arquivo carregado.");
    }

    const filePath = `products/${uuidv4()}-${imageFile?.originalname}`;
    const bucketFile = bucket.file(filePath);

    await bucketFile.save(imageFile.buffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filePath)}?alt=media`;

    const product = {
      id,
      name,
      style,
      idStyle,
      idCategory,
      category,
      price,
      image: imageUrl,
    };

    await db.collection("products").doc(product.id).set(product);
    return res.status(201).json(product);
  } catch (error) {
    return console.log("Erro ao criar categoria!");
  }
}

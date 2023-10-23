import { Request, Response } from "express";
import { bucket, db } from "../../util/admin";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id, idCategory, idStyle, name, category, style, price } = req.body;
    const { productId } = req.params;
    const imageFile = req.file;

    // verify if name exists
    if (!name) {
      res.status(400).send("O nome da categoria é obrigatório.");
      return;
    }

    // delete old product
    const productRef = db.collection("products").doc(productId);
    const doc = (await productRef.get()).data();

    if (!doc) {
      console.log("Produto não encontrado!");
      return res.sendStatus(404);
    }

    if (imageFile) {
      const imageUrl = bucket.file(doc?.image).name;
      const imageName = path
        .basename(decodeURIComponent(imageUrl))
        .replace(/\?alt=media$/, "");
      await bucket.file("products/" + imageName).delete();
    }

    // update values
    const filePath = `products/${uuidv4()}-${imageFile?.originalname}`;
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

    const product = {
      id: id ? id : doc?.id,
      idCategory: idCategory ? idCategory : doc?.idCategory,
      idStyle: idStyle ? idStyle : doc?.idStyle,
      name: name ? name : doc?.name,
      category: category ? category : doc?.category,
      style: style ? style : doc?.style,
      price: price ? price : doc?.price,
      image: imageFile ? imageUrl : doc?.image,
    };

    await productRef.delete();

    // create new doc
    await db.collection("products").doc(product.id).set(product);

    return res.sendStatus(204);
  } catch (error) {
    return console.log("Erro ao atualizar produto!");
  }
}

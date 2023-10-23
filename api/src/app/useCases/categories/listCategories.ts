import { db } from "../../util/admin";
import { Request, Response, query } from "express";

export async function listCategories(req: Request, res: Response) {
  try {
    const categoriesRef = await db.collection("categories").get();

    return res.status(201).json(categoriesRef.docs.map((doc) => doc.data()));
  } catch (error) {
    console.log("Erro ao listar as categorias!");
  }
}

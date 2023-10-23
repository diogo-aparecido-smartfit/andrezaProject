import { db } from "../../util/admin";
import { Request, Response, query } from "express";

export async function listProducts(req: Request, res: Response) {
  try {
    const productsRef = await db.collection("products").get();

    return res.status(201).json(productsRef.docs.map((doc) => doc.data()));
  } catch (error) {
    console.log("Erro ao listar os produtos!");
  }
}

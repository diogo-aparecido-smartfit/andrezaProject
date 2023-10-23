import { db } from "../../util/admin";
import { Request, Response, query } from "express";

export async function listBanner(req: Request, res: Response) {
  try {
    const bannerRef = await db.collection("banner").get();

    return res.status(201).json(bannerRef.docs.map((doc) => doc.data()));
  } catch (error) {
    console.log("Erro ao listar banner!", error);
    return res.sendStatus(500);
  }
}

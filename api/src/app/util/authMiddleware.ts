import { NextFunction, Response, Request } from "express";
import admin from "firebase-admin";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const checkAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.sendStatus(403).json({ error: "Não autorizado" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(403).json({ error: "Não autorizado" });
    });
};

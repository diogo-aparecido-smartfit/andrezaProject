import multer from "multer";
import { Router } from "express";
import { createCategory } from "./app/useCases/categories/createCategory";
import { deleteCategory } from "./app/useCases/categories/deleteCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { updateCategory } from "./app/useCases/categories/updateCategory";
import { createProduct } from "./app/useCases/products/createProduct";
import { updateProduct } from "./app/useCases/products/updateProduct";
import { deleteProduct } from "./app/useCases/products/deleteProduct";
import { listStyles } from "./app/useCases/styles/listStyles";
import { createStyles } from "./app/useCases/styles/createStyles";
import { updateStyles } from "./app/useCases/styles/updateStyles";
import { deleteStyles } from "./app/useCases/styles/deleteStyles";
import { listSocialMedia } from "./app/useCases/socialMedia/listSocialMedia";
import { createSocialMedia } from "./app/useCases/socialMedia/createSocialMedia";
import { updateSocialMedia } from "./app/useCases/socialMedia/updateSocialMedia";
import { deleteSocialMedia } from "./app/useCases/socialMedia/deleteSocialMedia";
import { listBanner } from "./app/useCases/banner/listBanner";
import { createBanner } from "./app/useCases/banner/createBanner";
import { updateBanner } from "./app/useCases/banner/updateBanner";
import { deleteBanner } from "./app/useCases/banner/deleteBanner";

const router = Router();
export default router;

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("Hello World");
});

// categories
router.get("/categories", listCategories);
router.post("/categories", upload.single("image"), createCategory);
router.put("/categories/:categoryId", upload.single("image"), updateCategory);
router.delete("/categories/:categoryId", deleteCategory);

// products
router.get("/products", listProducts);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:productId", upload.single("image"), updateProduct);
router.delete("/products/:productId", deleteProduct);

// styles
router.get("/styles", listStyles);
router.post("/styles", upload.single("image"), createStyles);
router.put("/styles/:styleId", upload.single("image"), updateStyles);
router.delete("/styles/:styleId", deleteStyles);

// SocialMedia
router.get("/media", listSocialMedia);
router.post("/media", createSocialMedia);
router.put("/media", updateSocialMedia);
router.delete("/media", deleteSocialMedia);

// Banner
router.get("/banner", listBanner);
router.post("/banner", upload.single("image"), createBanner);
router.put("/banner", upload.single("image"), updateBanner);
router.delete("/banner", deleteBanner);

import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/create", postController.renderCreateForm);
router.post("/create", postController.create);
router.get("/edit/:id", postController.renderEditForm);
router.post("/edit/:id", postController.update);
router.get("/delete/:id", postController.delete);

export default router;
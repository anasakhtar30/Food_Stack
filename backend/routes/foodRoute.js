import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer"; // for image storage system

const foodRouter = express.Router();

//Image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // NOW WE CAN STORE THE IMAGE IN THE UPLOAD FOLDER

foodRouter.post("/add", upload.single("image"), addFood); //🔥 multer image ko handle kare upload hone se pehle addFood chale:
// Without this middleware:
// req.file empty hota.

// addFood ko image ka access hi nahi milta.

// Server ko pata hi nahi hota ki user ne koi image bheji bhi hai ya nahi.
foodRouter.get("/list", listFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;

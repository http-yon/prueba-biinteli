import express from "express";
import { searchData } from "../controllers/api.controllers.js";

const apiRouter = express.Router()

apiRouter.get("/search/:origin/:destination", searchData)

export default apiRouter
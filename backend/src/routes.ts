import {Router} from "express";
import {CreateUserController} from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin} from "./middlewares/ensureAdmin";


const router = Router();

/* USER ROUTES|CONTROLLERS */
const createUserController = new CreateUserController();

router.post("/users", createUserController.handle);


/* TAG ROUTES|CONTROLLERS */
const createTagController = new CreateTagController();

router.post("/tags", ensureAdmin, createTagController.handle)

export { router }
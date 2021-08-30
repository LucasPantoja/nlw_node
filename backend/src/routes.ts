import {Router} from "express";
import {ensureAdmin} from "./middlewares/ensureAdmin";
import {CreateUserController} from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {AuthenticateUserController} from "./controllers/AuthenticateUserController";
import {CreateComplimentController} from "./controllers/CreateComplimentController";


const router = Router();

/* USER ROUTES|CONTROLLERS */
const createUserController = new CreateUserController();
router.post("/users", createUserController.handle);


/* TAG ROUTES|CONTROLLERS */
const createTagController = new CreateTagController();
router.post("/tags", ensureAdmin, createTagController.handle);

/* AUTHENTICATION ROUTES|CONTROLLERS */
const authenticateUserController = new AuthenticateUserController();
router.post("/login", authenticateUserController.handle);

/* COMPLIMENT ROUTES|CONTROLLERS */
const createComplimentController = new CreateComplimentController();
router.post("/compliments", createComplimentController.handle);





export { router }
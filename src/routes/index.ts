import { Router } from "express"
import TodoCtlr from "../controllers/todo-controllers"

const router = Router()
const todoCtlr = new TodoCtlr()

router.get("/", (r, s) => {
    s.status(200).json({
        success: true,
        version: "1.0.0",
        message: "Hello World"
    })
})

router.get("/todos", todoCtlr.get)
router.get("/todos/:id", todoCtlr.getDetail)
router.post("/todos", todoCtlr.post)

export default router
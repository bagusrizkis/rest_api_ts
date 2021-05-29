import {
    Request as Req, Response as Res
} from "express"
import {
    selectAllTodos,
    TodoFields,
    createTodo,
    getDetailFromId
} from "../querys/table"
import pool from "../dbconfig/db"

class TodoController {

    public async get(req: Req, res: Res) {
        try {

            const client = await pool.connect()
            const { rows } = await client.query(selectAllTodos)
            const todos: TodoFields[] = rows

            client.release()

            res.status(200).json({
                success: true,
                data: todos
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                error: error
            })

        }
    }

    public async post(req: Req, res: Res) {
        try {
            const { title, status, due_date } = req.body
            const client = await pool.connect()
            const query = await client.query(
                createTodo, [title, status, new Date(), new Date(due_date)]
            )

            const todos: TodoFields[] = query.rows

            client.release()

            res.status(201).json({
                success: true,
                message: "created",
                data: todos
            })

        } catch (error) {

            res.status(500).json({
                success: false,
                error: error
            })

        }
    }

    public async getDetail(req: Req, res: Res) {
        try {

            const { id } = req.params
            const client = await pool.connect()
            const { rows } = await client.query(
                getDetailFromId, [id]
            )
            const todos: TodoFields[] = rows

            client.release()

            if (todos.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "success get detail",
                    data: todos
                })
            } else {
                throw {
                    name: "NotFound",
                    message: "Todo with id " + id + " not found."
                }
            }

        } catch (error) {
            let status = 500
            if (error.name == "NotFound") status = 404
            res.status(status).json({
                success: false,
                error: error
            })

        }
    }

}

export default TodoController
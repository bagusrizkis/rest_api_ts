import express, { Application } from "express"
import router from "./routes"
import pool from "./config/db"

export default class Server {
    private app: Application;

    constructor() {
        this.app = express()
        this.config()
        this.routerConfig()
        this.dbConnect()
    }

    private config() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json({ limit: '1mb' }))
    }

    private dbConnect() {
        pool.connect((err) => {
            if (err) throw err
            console.log('Db Connected')
        })
    }

    private routerConfig() {
        this.app.use("/", router)
    }

    public startServer(PORT: number) {
        const env: string = this.app.get('env')
        return new Promise<{ PORT: number, env: string }>((resolve, reject) => {
            this.app.listen(PORT, () => {
                resolve({
                    PORT: PORT,
                    env: env
                })
            }).on('error', (err: Object) => {
                reject(err)
            })
        })
    }
}
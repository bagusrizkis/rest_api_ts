import { config } from "dotenv"
if (process.env.NODE_ENV != "production") config({ path: '.env' })
import Server from "./server"

const PORT: number = parseInt(process.env.PORT || "3000")

new Server().startServer(PORT)
    .then(({ PORT, env }) => {
        console.log(
            `X App :: running on http://localhost:${PORT} in ${env} mode`,
        )
    })
    .catch(err => {
        console.log(err)
    })
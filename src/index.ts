import dotenv from "dotenv"
import Server from "./server"

dotenv.config({ path: ".env" })
const PORT: number = parseInt(process.env.PORT || "3000")

export default new Server().startServer(PORT)
    .then(({ PORT, env }) => {
        console.log(
            `X App :: running on http://localhost:${PORT} in ${env} mode`,
        )
    })
    .catch(err => {
        console.log(err)
    })
import Server from "./server"

const PORT = parseInt(process.env.PORT || "3000")

export default new Server().start(PORT)
    .then(({ PORT, env }) => {
        console.log(
            "X App :: running on http://localhost:%i in %s mode",
            PORT,
            env
        )
    })
    .catch(err => {
        console.log(err)
    })
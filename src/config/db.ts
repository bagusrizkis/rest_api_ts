import { Pool } from "pg"

export default new Pool({
    max: 20,
    connectionString:
        process.env.DB_STRING_CONFIG,
    idleTimeoutMillis: 30000
})
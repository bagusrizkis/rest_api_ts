import { Pool } from "pg"

export default new Pool({
    max: 20,
    connectionString:
        'postgres://postgres:postgres@localhost:5432/x_rest_api_ts',
    idleTimeoutMillis: 30000
})
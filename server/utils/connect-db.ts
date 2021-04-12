import "reflect-metadata";
import { createConnection } from "typeorm";

const connectDb = async () => {
    if (!process.env.DB_CONNECTION) {
        console.error(`> DB environment variables not found, cannot establish connection`)
        return
    }

    try {
        console.log(`> DB environment variables found, attempting connection to ${process.env.DB_NAME}`)
        await createConnection()
        console.log(
            `> Successfully connected to ${process.env.DB_CONNECTION} database,\
            ${process.env.DB_NAME} on port ${process.env.DB_PORT}`
        )
    } catch (err) {
        console.error(
            `> Connection failed to ${process.env.DB_CONNECTION} database,\ 
            ${process.env.DB_NAME} on port ${process.env.DB_PORT} \n ${JSON.stringify(err)}`
        )
    }
}

export default connectDb

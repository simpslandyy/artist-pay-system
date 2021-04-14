import "reflect-metadata";
import { createConnection, getConnectionOptions, ConnectionOptions } from "typeorm";

const getDBConnectionOptions = async () => {
    console.log(`> Attempting connection ...`)
    if (!process.env.CLEARDB_DATABASE_URL)  return await getConnectionOptions()
    const connectionOptions: ConnectionOptions = {
        type: 'mysql',
        synchronize: false,
        logging: false,
        extra: {
        ssl: true,
        },
        migrationsRun: true,
        entities: ['server/entity/**/*.ts'],
        migrations: ['server/migration/**/*.ts']
    }
        
    Object.assign(connectionOptions, { url: process.env.CLEARDB_DATABASE_URL });
    return connectionOptions
}

const connectDb = async () => {
    try {
        const options = await getDBConnectionOptions()
        await createConnection(options)

        console.log(
            `> Successfully connected to database`
        )
    } catch (err) {
        console.error(
            `> Connection failed to database \n ${JSON.stringify(err)}`
        )
    }
}

export default connectDb

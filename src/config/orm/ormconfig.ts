import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'mediumcloneuser',
    password: '123',
    database: 'mediumclone',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: false, // only for develoment purpuses
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
};

export default config;

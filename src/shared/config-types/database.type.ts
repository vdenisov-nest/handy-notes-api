// tslint:disable:max-classes-per-file

class IConfigDatabaseConnection {
  type: any;
  host: any;
  port: any;
  username: any;
  password: any;
  database: any;
}

class IConfigDatabaseConfig {
  synchronize: any;
  logging: any;
  entities: any[];
}

export class IConfigDatabase {
  connection: IConfigDatabaseConnection;
  config: IConfigDatabaseConfig;
}

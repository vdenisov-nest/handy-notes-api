// tslint:disable:max-classes-per-file

export class IApp {
  port: number;
}

export class IJwt {
  salt: number;
  secret: string;
}

class IDatabaseConnection {
  type: any;
  host: any;
  port: any;
  username: any;
  password: any;
  database: any;
}

class IDatabaseConfig {
  synchronize: any;
  logging: any;
  entities: any[];
}

export class IDatabase {
  connection: IDatabaseConnection;
  config: IDatabaseConfig;
}

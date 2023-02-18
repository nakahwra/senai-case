import { ActiveModelSerializer, createServer, Factory, Model } from "miragejs";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type Environment = {
  id: number;
  name: string;
  mac_addresses: string[];
  classes: string[];
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      monitoring: Model.extend<Partial<Environment>>({}),
    },

    factories: {
      user: Factory.extend({
        id(i: number) {
          return i + 1000;
        },
        username(i: number) {
          return `João Ianky ${i + 1}`;
        },
        email(i: number) {
          return `jp${i + 1}@email.com`;
        },
        password() {
          return "123456";
        },
      }),

      monitoring: Factory.extend({
        id(i: number) {
          return i + 100;
        },
        name(i: number) {
          return `Environment ${i + 1}`;
        },
        macAddresses() {
          return [
            "b8:57:df:64:0b:41",
            "0e:92:8d:f5:54:89",
            "4e:f8:23:06:48:2b",
            "16:c2:03:a0:16:9f",
          ];
        },
        classes() {
          return ["Capacete", "Óculos", "Protetor auricular"];
        },
      }),
    },

    seeds(server) {
      server.createList("user", 5);
      server.createList("monitoring", 5);
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;

      this.get("/user");
      this.get("/user/:id");
      this.post("/user");
      this.del("/user/:id");

      this.get("/monitoring");
      this.get("/monitoring/:id");
      this.post("/monitoring");
      this.del("/monitoring/:id");
    },
  });

  return server;
}

import { ActiveModelSerializer, createServer, Factory, Model } from "miragejs";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type Environment = {
  name: string;
  macAddresses: string[];
  classes: string[];
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      environment: Model.extend<Partial<Environment>>({}),
    },

    factories: {
      user: Factory.extend({
        id(i: number) {
          return i + 1000;
        },
        username(i: number) {
          return `João Pedro ${i + 1}`;
        },
        email(i: number) {
          return `jp${i + 1}@email.com`;
        },
        password() {
          return "123456";
        },
      }),

      environment: Factory.extend({
        name(i: number) {
          return `Environment ${i + 1}`;
        },
        macAddresses() {
          return ["00:00:00:00:00:00"];
        },
        classes() {
          return ["Capacete", "Óculos", "Protetor auricular"];
        },
      }),
    },

    seeds(server) {
      server.createList("user", 5);
      server.createList("environment", 5);
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;

      this.get("/user");
      this.get("/user/:id");
      this.post("/user");
      this.del("/user/:id");
    },
  });

  return server;
}

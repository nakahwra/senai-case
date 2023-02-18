import { createServer, Model } from "miragejs";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create("user", {
        id: 1234,
        username: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
    },

    routes() {
      this.namespace = "api";
      this.get("/user");
    },

    timing: 750,
  });

  return server;
}

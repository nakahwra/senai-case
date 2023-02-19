import { faker } from "@faker-js/faker";
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

type Report = {
  id: number;
  environment_id: number;
  mac_address: string;
  class: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      monitoring: Model.extend<Partial<Environment>>({}),
      report: Model.extend<Partial<Report>>({}),
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

      report: Factory.extend({
        id(i: number) {
          return i + 1;
        },
        environmentId() {
          return 100;
        },
        macAddress() {
          return "b8:57:df:64:0b:41";
        },
        class() {
          return "Capacete";
        },
        createdAt() {
          return faker.date.between("2018-01-01", "2022-12-31");
        },
      }),
    },

    seeds(server) {
      server.createList("user", 5);
      server.createList("monitoring", 2);
      server.createList("report", 500);
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

      this.get("dashboard/:id_monitoring/", (schema, request) => {
        const { id_monitoring } = request.params;

        const reports = schema.reports.where({
          environmentId: parseInt(id_monitoring),
        });

        return reports;
      });

      this.get(
        "/dashboard/:id_monitoring/:day/:month/:year",
        (schema, request) => {
          const { id_monitoring, day, month, year } = request.params;

          const reports = schema.reports
            .where({
              environmentId: parseInt(id_monitoring),
            })
            .models.filter((report: Report) => {
              const createdDate = new Date(report.createdAt);
              return (
                parseInt(year) !== 0 &&
                createdDate.getFullYear() === parseInt(year)
                // parseInt(month) !== 0 &&
                // createdDate.getMonth() === parseInt(month) - 1 &&
                // parseInt(day) !== 0 &&
                // createdDate.getDate() === parseInt(day)
              );
            })
            .slice(0, 10);

          return reports;
        }
      );
    },
  });

  return server;
}

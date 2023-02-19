import { faker } from "@faker-js/faker/locale/pt_BR";
import { ActiveModelSerializer, createServer, Factory, Model } from "miragejs";
import { CLASSES, MAC_ADDRESSES } from "../../utils/faker";

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
        username() {
          return faker.name.firstName();
        },
        email() {
          return faker.internet.email();
        },
        password() {
          return faker.internet.password(6);
        },
      }),

      monitoring: Factory.extend({
        id(i: number) {
          return i + 100;
        },
        name(i: number) {
          return `${faker.address.streetAddress()} - ${faker.address.cityName()}`;
        },
        macAddresses() {
          return faker.helpers.arrayElements(MAC_ADDRESSES);
        },
        classes() {
          return faker.helpers.arrayElements(CLASSES);
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
          return faker.helpers.arrayElement(MAC_ADDRESSES);
        },
        class() {
          return faker.helpers.arrayElement(CLASSES);
        },
        createdAt() {
          return faker.date.between("2018-01-01", "2022-12-31");
        },
      }),
    },

    seeds(server) {
      server.createList("user", 5);
      server.createList("monitoring", 4);
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

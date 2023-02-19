import { faker } from "@faker-js/faker/locale/pt_BR";

export const MAC_ADDRESSES = Array.from({ length: 3 }, () =>
  faker.internet.mac()
);

export const CLASSES = [
  "Capacete",
  "Luvas",
  "Protetor auricular",
  "Óculos",
  "Botas",
];

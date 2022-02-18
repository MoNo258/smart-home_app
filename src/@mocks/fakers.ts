import { faker } from "@faker-js/faker";

const roomsType = [
  "Kitchen",
  "Hall",
  "Bedroom",
  "Bathroom",
  "Living room",
  "Master bedroom",
  "Guest bathroom",
  "Porch",
];
const connectionState = ["connected", "disconnected", "poorConnection"];

export const allDevicesBasic: SmartDevice[] = [
  {
    type: "bulb",
    id: `11`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "temperatureSensor",
    id: `22`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "outlet",
    id: `33`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "bulb",
    id: `44`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "temperatureSensor",
    id: `55`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "outlet",
    id: `66`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
  {
    type: "outlet",
    id: `77`,
    name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
    connectionState: `${faker.random.arrayElement(
      connectionState
    )}` as connectionStateType,
  },
];

const fakeDeviceDetails11: SmartDeviceDetails = {
  type: "bulb",
  id: `11`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  isTurnedOn: faker.datatype.boolean(),
  brightness: Math.floor(Math.random() * 101),
  color: faker.vehicle.color(),
};
const fakeDeviceDetails22: SmartDeviceDetails = {
  type: "temperatureSensor",
  id: `22`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  temperature: faker.datatype.number({ min: 15, max: 38, precision: 0.01 }),
};
const fakeDeviceDetails33: SmartDeviceDetails = {
  type: "outlet",
  id: `33`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  isTurnedOn: faker.datatype.boolean(),
  powerConsumption: faker.datatype.number({
    max: 5000,
  }),
};
const fakeDeviceDetails44: SmartDeviceDetails = {
  type: "bulb",
  id: `44`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  isTurnedOn: faker.datatype.boolean(),
  brightness: Math.floor(Math.random() * 101),
  color: faker.vehicle.color(),
};
const fakeDeviceDetails55: SmartDeviceDetails = {
  type: "temperatureSensor",
  id: `55`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  temperature: faker.datatype.number({ min: 15, max: 38, precision: 0.01 }),
};
const fakeDeviceDetails66: SmartDeviceDetails = {
  type: "outlet",
  id: `66`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  isTurnedOn: faker.datatype.boolean(),
  powerConsumption: faker.datatype.number({
    max: 5000,
  }),
};
const fakeDeviceDetails77: SmartDeviceDetails = {
  type: "outlet",
  id: `77`,
  name: `${faker.random.arrayElement(roomsType)} - ${faker.random.words(2)}`,
  connectionState: `${faker.random.arrayElement(
    connectionState
  )}` as connectionStateType,
  isTurnedOn: faker.datatype.boolean(),
  powerConsumption: faker.datatype.number({
    max: 5000,
  }),
};

export const fakeDeviceDetails = {
  11: fakeDeviceDetails11,
  22: fakeDeviceDetails22,
  33: fakeDeviceDetails33,
  44: fakeDeviceDetails44,
  55: fakeDeviceDetails55,
  66: fakeDeviceDetails66,
  77: fakeDeviceDetails77,
  // 88: fakeDeviceDetails88,
  // 99: fakeDeviceDetails99,
  // 00: fakeDeviceDetails00,
};

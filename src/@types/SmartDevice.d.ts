interface SmartDevice {
  type: deviceType; // 'bulb', 'outlet' or 'temperatureSensor';
  id: string;
  name: string;
  connectionState: connectionStateType; // 'connected', 'disconnected' or 'poorConnection'
}
type deviceType = "bulb" | "outlet" | "temperatureSensor";
type connectionStateType = "connected" | "disconnected" | "poorConnection";

type SmartDeviceDetails = SmartBulb | SmartOutlet | SmartTemperatureSensor;

interface SmartBulb {
  type: "bulb";
  id: string;
  name: string;
  connectionState: connectionStateType; // 'connected', 'disconnected' or 'poorConnection'
  isTurnedOn: boolean;
  brightness: number; // <0, 100>
  color: InstanceType<typeof React.HTMLAttributes.color>; // in the CSS formats
}

interface SmartOutlet {
  type: "outlet";
  id: string;
  name: string;
  connectionState: connectionStateType; // 'connected', 'disconnected' or 'poorConnection'
  isTurnedOn: boolean;
  powerConsumption: number; // in watts
}

interface SmartTemperatureSensor {
  type: "temperatureSensor";
  id: string;
  name: string;
  connectionState: connectionStateType; // 'connected', 'disconnected' or 'poorConnection'
  temperature: number; // in Celsius
}

interface DevicesListState {
  loading: boolean;
  devicesList: SmartDevice[];
  error?: string;
}
interface DevicesDetailsState {
  loading: boolean;
  deviceDetails: SmartDeviceDetails;
  error?: string;
}

type MockDeviceIdType = 11 | 22 | 33 | 44 | 55 | 66 | 77;
interface MockDeviceIdInterface {
  deviceId: MockDeviceIdType;
}
interface ILightOption {
  key: string;
  name: string;
  tempInKelvin: number;
  color: string
}
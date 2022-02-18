import { SemanticICONS } from "semantic-ui-react";

/**
 * Splitting given array into groups; sized based on provided parameter
 * @param type: parameter from API that reflect type of device
 * @returns object with device's name for Icon and description
 */
export const displayDeviceType = (type: deviceType) => {
  switch (type) {
    case "outlet":
      return {
        name: "plug" as SemanticICONS,
        description: "Control electrical sockets in the room",
      };
    case "temperatureSensor":
      return {
        name: "thermometer" as SemanticICONS,
        description: "Control temperature in the room",
      };
    default:
      return {
        name: "lightbulb" as SemanticICONS,
        description: "Control the brightness in the room",
      };
  }
};

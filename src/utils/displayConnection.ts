import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

/**
 * Splitting given array into groups; sized based on provided parameter
 * @param connectionState: parameter from API that reflect connection status of device
 * @returns object with device's information about connection and related color
 */
export const displayConnection = (connectionState: connectionStateType) => {
  switch (connectionState) {
    case "disconnected":
      return {
        state: "no connection",
        color: "#bb0a1e",
        colorSemantic: "red" as SemanticCOLORS,
      };
    case "poorConnection":
      return {
        state: "poor connection",
        color: "#f9a602",
        colorSemantic: "yellow" as SemanticCOLORS,
      };
    default:
      return {
        state: "device connected",
        color: "#228c22",
        colorSemantic: "green" as SemanticCOLORS,
      };
  }
};

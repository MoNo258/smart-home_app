import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "semantic-ui-react";
import { useGlobalState } from "../../helpers";

type DevicesListProps = {
  propName?: string;
};
const DevicesList: React.FC<DevicesListProps> = () => {
  const devicesList = useGlobalState((state) => state.devicesList.devicesList);
  const isLoading = useGlobalState((state) => state.devicesList.loading);
  const navigate = useNavigate();
  const [devicesTotal, setDevicesTotal] = React.useState<number>(0);

  const showDevice = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    login: string
  ) => {
    navigate(`/${login}`);
  };

  return (
    <List>
      {devicesList &&
        devicesList.map((device: SmartDevice) => {
          return (
            <React.Fragment>
              <div>{device.connectionState}</div>
              <div>{device.id}</div>
              <div>{device.name}</div>
              <div>{device.type}</div>
            </React.Fragment>
          );
        })}
    </List>
  );
};
DevicesList.displayName = "DevicesList";
export default DevicesList;

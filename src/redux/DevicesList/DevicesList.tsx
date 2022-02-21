import _times from "lodash/times";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Icon, Segment } from "semantic-ui-react";
import {
  displayConnection,
  displayDeviceType,
  splitArrayInGroups
} from "src/utils";
import SkeletonList from "../../Components/SkeletonList";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { DevicesListAction } from "../../redux";

type DevicesListProps = {
  propName?: string;
};
const DevicesList: React.FC<DevicesListProps> = () => {
  const dispatch = useGlobalDispatch();
  const navigate = useNavigate();
  const devicesList = useGlobalState((state) => state.devicesList.devicesList);
  const isLoading = useGlobalState((state) => state.devicesList.loading);
  const [devicesTotal, setDevicesTotal] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(DevicesListAction.fetchDevices());
  }, []);
  // React.useEffect(() => {
  //   const fechOnInterval = setInterval(() => {
  //     dispatch(DevicesListAction.fetchDevices());
  //   }, 600000) 
  //   return () => clearInterval(fechOnInterval)
  // }, []);

  const manySkeletons = _times(3, (i: number) => <SkeletonList key={i} />);

  const CompAndTabletGrid: React.FC<
    SmartDevice & { connectionStatus: string }
  > = ({ type, id, name, connectionState, connectionStatus }) => (
    <Grid.Column>
      <Card onClick={() => navigate(`/${id}`)} color="blue">
        <Card.Content>
          <Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {name}
              <span>
                <Icon name={displayDeviceType(type).name} size="large" />
              </span>
            </div>
          </Card.Header>
          <Card.Meta>{displayDeviceType(type).description}</Card.Meta>
          <Card.Description>
            Status:{" "}
            <strong
              style={{ color: `${displayConnection(connectionState).color}` }}
            >
              {displayConnection(connectionState).state}
            </strong>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
  const allDevicesChunkByThree = splitArrayInGroups(devicesList, 3);
  const allDevicesChunkByTwo = splitArrayInGroups(devicesList, 2);

  return (
    <Segment>
      {isLoading ? (
        manySkeletons
      ) : (
        <Grid>
          {allDevicesChunkByThree.map((chunk, id) => (
            <Grid.Row columns={3} only="computer" key={id}>
              {chunk.map((device) => (
                <CompAndTabletGrid
                  key={device.id}
                  type={device.type}
                  id={device.id}
                  name={device.name}
                  connectionState={device.connectionState}
                  connectionStatus={
                    displayConnection(device.connectionState).state
                  }
                />
              ))}
            </Grid.Row>
          ))}
          {allDevicesChunkByTwo.map((chunk, id) => (
            <Grid.Row columns={2} only="tablet" key={id}>
              {chunk.map((device) => (
                <CompAndTabletGrid
                  key={device.id}
                  type={device.type}
                  id={device.id}
                  name={device.name}
                  connectionState={device.connectionState}
                  connectionStatus={
                    displayConnection(device.connectionState).state
                  }
                />
              ))}
            </Grid.Row>
          ))}
          {devicesList &&
            devicesList.map((device) => (
              <Grid.Row only="mobile" centered key={device.id}>
                <Grid.Column width={16}>
                  <Card color="blue" onClick={() => navigate(`/${device.id}`)}>
                    <Card.Content>
                      <Card.Header>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {device.name}
                          <span>
                            <Icon
                              name={displayDeviceType(device.type).name}
                              size="large"
                            />
                          </span>
                        </div>
                      </Card.Header>
                      <Card.Meta>
                        {displayDeviceType(device.type).description}
                      </Card.Meta>
                      <Card.Description>
                        Status:{" "}
                        <strong
                          style={{
                            color: `${displayConnection(device.connectionState).color
                              }`,
                          }}
                        >
                          {displayConnection(device.connectionState).state}
                        </strong>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            ))}
        </Grid>
      )}
    </Segment>
  );
};
DevicesList.displayName = "DevicesList";
export default DevicesList;

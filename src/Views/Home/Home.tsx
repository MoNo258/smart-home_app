import _times from "lodash/times";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Grid,
  Icon,
  Menu,
  MenuItemProps,
  Segment,
  SemanticICONS,
} from "semantic-ui-react";
// import { allDevicesBasic } from "src/@mocks/fakers";
import { splitArrayInGroups } from "src/utils";
import styled from "styled-components";
import SkeletonList from "../../Components/SkeletonList";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { DevicesListAction } from "../../redux";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useGlobalDispatch();
  const devicesList = useGlobalState((state) => state.devicesList.devicesList);
  const isLoading = useGlobalState((state) => state.devicesList.loading);
  const [currId, setCurrId] = React.useState("");
  console.log("currId", currId);

  React.useEffect(() => {
    dispatch(DevicesListAction.fetchDevices());
  }, []);

  const manySkeletons = _times(3, (i: number) => <SkeletonList key={i} />);

  const sections = [
    { key: "Home", content: "Home", link: true },
    { key: "Store", content: "Store", link: true },
    { key: "Shirt", content: "T-Shirt", active: true },
  ];
  const [activeItem, setActiveItem] = React.useState<string | undefined>(
    "home"
  );
  const selectDeviceType = (type: string) => {
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
  const selectConnection = (connectionState: string) => {
    switch (connectionState) {
      case "disconnected":
        return { state: "no connection", color: "#bb0a1e" };
      case "poorConnection":
        return { state: "poor connection", color: "#f9a602" };
      default:
        return { state: "device connected", color: "#228c22" };
    }
  };
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
                <Icon name={selectDeviceType(type).name} size="large" />
              </span>
            </div>
          </Card.Header>
          <Card.Meta>{selectDeviceType(type).description}</Card.Meta>
          <Card.Description>
            Status:{" "}
            <strong
              style={{ color: `${selectConnection(connectionState).color}` }}
            >
              {selectConnection(connectionState).state}
            </strong>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
  const allDevicesChunkByThree = splitArrayInGroups(devicesList, 3);
  const allDevicesChunkByTwo = splitArrayInGroups(devicesList, 2);

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => {
    console.log("clicked item:", data.name);
    setActiveItem(data.name);
  };

  return (
    <HomeStyled className="home">
      <Breadcrumb icon="right angle" sections={sections} />
      <Menu pointing>
        <Menu.Item
          name="devices"
          active={activeItem === "devices"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="new"
          active={activeItem === "new"}
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data) =>
            handleMenuItemClick(e, data)
          }
        />
        <Menu.Item
          name="test"
          active={activeItem === "test"}
          onClick={handleMenuItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            icon="setting"
            name="settings"
            active={activeItem === "settings"}
            onClick={handleMenuItemClick}
          />
        </Menu.Menu>
      </Menu>
      <Segment>
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
                    selectConnection(device.connectionState).state
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
                    selectConnection(device.connectionState).state
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
                              name={selectDeviceType(device.type).name}
                              size="large"
                            />
                          </span>
                        </div>
                      </Card.Header>
                      <Card.Meta>
                        {selectDeviceType(device.type).description}
                      </Card.Meta>
                      <Card.Description>
                        Status:{" "}
                        <strong
                          style={{
                            color: `${
                              selectConnection(device.connectionState).color
                            }`,
                          }}
                        >
                          {selectConnection(device.connectionState).state}
                        </strong>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            ))}
        </Grid>
      </Segment>
    </HomeStyled>
  );
};

export default Home;

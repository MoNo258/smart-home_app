import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonProps,
  Card,
  Dimmer,
  Header,
  Icon,
  Label,
  Message,
  Progress,
  Segment
} from "semantic-ui-react";
import { displayConnection, displayDeviceType } from "src/utils";
import ButtonComponent from "../../Components/ButtonComponent";
import { useGlobalDispatch, useGlobalState } from "../../helpers";

type DeviceDetailsProps = {
  propName?: string;
};
const DeviceDetails: React.FC<DeviceDetailsProps> = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const deviceDetails = useGlobalState(
    (state) => state.deviceDetails.deviceDetails
  );
  const isLoading = useGlobalState((state) => state.deviceDetails.loading);
  const idParam = window.location.pathname;
  const [isDeleted, setIsDeleted] = React.useState(false);

  console.log("deviceDetails", deviceDetails);

  const isConnected = deviceDetails.connectionState !== 'disconnected'

  // React.useEffect(() => {
  //   dispatch(DeviceDetailsAction.fetchDeviceDetails(idParam.slice(1)));
  // }, []);

  const visitHomepage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    navigate(`/`);
  };

  const deleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    // deleteSingleUser(idParam.slice(1));
    setIsDeleted(true);
  };

  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setActiveIndex(Number(e.target.value));
  const lightOptionColor = [
    {
      key: "option-1",
      name: "Daylight",
      tempInKelvin: 6500,
      color: "#F1F5F8",
    },
    {
      key: "option-2",
      name: "Natural white",
      tempInKelvin: 5000,
      color: "#F9FAFC",
    },
    {
      key: "option-3",
      name: "Cool white",
      tempInKelvin: 4100,
      color: "#FFFCF6",
    },
    {
      key: "option-4",
      name: "Warm white",
      tempInKelvin: 3500,
      color: "#FFF6E5",
    },
    {
      key: "option-5",
      name: "Soft white",
      tempInKelvin: 2700,
      color: "#FFF3DB",
    },
  ];

  const [percent, setPercent] = React.useState(0);
  const increment = () =>
    setPercent((prevState) => (prevState >= 100 ? 0 : prevState + 10));
  const decrement = () =>
    setPercent((prevState) => (prevState <= 0 ? 100 : prevState - 10));

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "500px", fontSize: "18px" }}>
              <Segment loading={isLoading}>
                <Label
                  color={`${displayConnection(deviceDetails.connectionState)
                    .colorSemantic
                    }`}
                  ribbon
                >
                  {displayConnection(deviceDetails.connectionState).state}
                </Label>
                <span>
                  {" "}
                  <Icon
                    name={displayDeviceType(deviceDetails.type).name}
                    size="large"
                  />
                  {deviceDetails.name}
                </span>
              </Segment>
            </div>
          </div>
        </Card.Header>
        <Card.Meta textAlign="center">
          <div style={{ paddingTop: "10px" }}>
            {displayDeviceType(deviceDetails.type).description}
          </div>
        </Card.Meta>
      </Card.Content>

      <Dimmer.Dimmable blurring dimmed={!isConnected}>
        <Dimmer active={!isConnected} inverted>
          <Message icon negative>
            <Icon name='exclamation triangle' color='red' />
            <Message.Content>
              <Message.Header>
                Sorry, you cannot control this device since it's disconnected.
              </Message.Header>
            </Message.Content>
          </Message>
        </Dimmer>

        <Card.Content>
          {deviceDetails.type !== "temperatureSensor" && (
            <Card.Description textAlign="center">
              Status: {(deviceDetails.isTurnedOn)
                ? <Label color='green' horizontal>is turned on</Label>
                : <Label color='red' horizontal>is turned off</Label>}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: '10px'
                }}
              >
                <Button onClick={increment} circular>
                  <Icon.Group size="large">
                    <Icon name="circle outline" size="big" color="grey" />
                    <Icon
                      name="power"
                      color={`${deviceDetails.isTurnedOn ? "red" : "green"}`}
                    />
                  </Icon.Group>
                </Button>
              </div>
            </Card.Description>
          )}
        </Card.Content>

        {deviceDetails.type === "outlet" && (
          <Card.Content textAlign="center">
            Power consumption:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {deviceDetails.powerConsumption} Watts
            </span>
          </Card.Content>
        )}
        {deviceDetails.type === "bulb" && (
          <Card.Content>
            <Segment>
              <Header as="h5" color="grey">
                Set brightness
              </Header>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button onClick={decrement} circular>
                  <Icon.Group size="big">
                    <Icon name="lightbulb outline" color="grey" />
                    <Icon name="minus" corner="bottom right" />
                  </Icon.Group>
                </Button>
                <Progress percent={percent} indicating />
                <Button onClick={increment} circular>
                  <Icon.Group size="big">
                    <Icon name="lightbulb outline" color="yellow" />
                    <Icon name="add" corner="bottom right" />
                  </Icon.Group>
                </Button>
              </div></Segment>

            <Segment inverted color='grey'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Header as="h5" color="grey">
                    Set light color
                  </Header>
                  <input
                    type="range"
                    min="0"
                    max={lightOptionColor.length - 1}
                    value={activeIndex}
                    onChange={handleSliderChange}
                    style={{ width: "300px" }}
                  />
                  <div>Color light: {lightOptionColor[activeIndex].name}</div>
                </div>
                <div
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "50px",
                    background: `${lightOptionColor[activeIndex].color}`,
                  }}
                />
              </div>
            </Segment>
          </Card.Content>
        )}

        {deviceDetails.type === "temperatureSensor" && (
          <Card.Content>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={decrement} circular>
                <Icon.Group size="big">
                  <Icon name="thermometer empty" size="large" color="blue" />
                </Icon.Group>
              </Button>
              <Progress percent={percent} indicating />
              <Button onClick={increment} circular>
                <Icon.Group size="big">
                  <Icon name="thermometer full" size="large" color="red" />
                </Icon.Group>
              </Button>
            </div>
          </Card.Content>
        )}
      </Dimmer.Dimmable>
      <Card.Content textAlign="center">
        <ButtonComponent
          loading={isLoading}
          isIcon
          iconName="arrow left"
          buttonText="Back"
          buttonColor="blue"
          isBasic
          onButtonClick={() => navigate("/")}
        />
        <ButtonComponent
          loading={isLoading}
          isIcon
          iconName="edit"
          buttonText="Edit details"
          buttonColor="blue"
          isBasic
          onButtonClick={(e, data) => deleteUser(e, data)}
          disabled={!isConnected}
        />
        {/* <ButtonComponent
          loading={isLoading}
          isIcon
          iconName="trash"
          buttonText="Delete user"
          buttonColor="red"
          isBasic
          onButtonClick={(e, data) => deleteUser(e, data)}
        /> */}
      </Card.Content>
      <Card.Content>
        {displayConnection(deviceDetails.connectionState).state ===
          "poor connection" && (
            <Message warning>
              <Message.Header>
                Warning! Control of this device might be difficult due to poor
                connection.
              </Message.Header>
              <p>Check the connection</p>
            </Message>
          )}
      </Card.Content>
    </Card>
  );
};
DeviceDetails.displayName = "DeviceDetails";
export default DeviceDetails;

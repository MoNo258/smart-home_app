import faker from "@faker-js/faker";
import _times from "lodash/times";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonProps,
  Card,
  Confirm,
  Icon,
  Label,
  Message,
  Progress,
  Segment,
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
  const panels = _times(3, (i) => ({
    key: `panel-${i}`,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  }));

  const [percent, setPercent] = React.useState(0);
  const increment = () =>
    setPercent((prevState) => (prevState >= 100 ? 0 : prevState + 10));

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card fluid>
      <Card.Content>
        {/* <Card.Header textAlign="center">
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name={displayDeviceType(deviceDetails.type).name}
              size="large"
            />
            {deviceDetails.name}
          </div>
        </Card.Header> */}
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
                  color={`${
                    displayConnection(deviceDetails.connectionState)
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
          <div style={{ padding: "10px" }}>
            {displayDeviceType(deviceDetails.type).description}
          </div>
        </Card.Meta>
        <Card.Description textAlign="center">
          Type: {deviceDetails.type}
        </Card.Description>
        <Card.Description textAlign="center">
          state: {deviceDetails.connectionState}
        </Card.Description>
        {deviceDetails.type !== "temperatureSensor" && (
          <Card.Description textAlign="center">
            <Icon name="power" size="large" />
            <Icon name="power off" size="large" />
            <Icon name="lightbulb" size="large" color="yellow" />
            <Icon name="lightbulb outline" size="large" color="grey" />
            <Icon name="thermometer empty" size="large" color="grey" />
            <Icon name="thermometer empty" size="large" color="blue" />
            <Icon name="thermometer half" size="large" color="orange" />
            <Icon name="thermometer full" size="large" color="red" />
            <Icon.Group size="big">
              <Icon name="circle outline" size="large" color="grey" />
              <Icon name="power" color="red" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="circle outline" size="large" color="grey" />
              <Icon name="power" color="green" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon size="large" color="grey" name="dont" />
              <Icon name="plug" color="grey" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="circle outline" size="large" color="green" />
              <Icon name="plug" color="green" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="dont" size="large" color="grey" />
              <Icon name="lightbulb" color="grey" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="circle outline" size="large" color="green" />
              <Icon name="lightbulb" color="green" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="lightbulb outline" />
              <Icon name="add" corner="bottom right" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="lightbulb outline" />
              <Icon name="minus" corner="bottom right" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="lightbulb" />
              <Icon name="add" corner="bottom right" />
            </Icon.Group>
            <Icon.Group size="big">
              <Icon name="lightbulb" />
              <Icon name="minus" corner="bottom right" />
            </Icon.Group>
            {/* status: {deviceDetails.isTurnedOn} */}
          </Card.Description>
        )}
        {deviceDetails.type === "outlet" && (
          <Card.Description textAlign="center">
            Power consumption: {deviceDetails.powerConsumption}
          </Card.Description>
        )}
        {/* <Card.Description textAlign="center">
          <div style={{ width: "210px" }}>
            <Segment raised>
              <Label as="a" color="red" ribbon>
                Overview
              </Label>
              <span>Account Details</span>
            </Segment>
          </div>
        </Card.Description> */}
      </Card.Content>
      <Card.Content>
        <Message negative>
          <Message.Header>
            Sorry, you cannot control this device since it's disconnected.
          </Message.Header>
          <p>Check the connection</p>
        </Message>
      </Card.Content>
      <Card.Content>
        <Message warning>
          <Message.Header>
            Warning! Control of this device might be difficult due to poor
            connection.
          </Message.Header>
          <p>Check the connection</p>
        </Message>
      </Card.Content>
      <Card.Content>
        <Segment secondary>
          <div>activeIndex: {activeIndex}</div>
          <input
            type="range"
            min="-1"
            max={panels.length - 1}
            value={activeIndex}
            onChange={handleSliderChange}
          />
        </Segment>
      </Card.Content>
      <Card.Content>
        <div>
          <Progress percent={percent} indicating />
          <Button onClick={increment}>Increment</Button>
        </div>
      </Card.Content>
      <Card.Content>
        <div>
          <Button onClick={() => setIsOpen(true)}>Show</Button>
          <Confirm
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          />
        </div>
      </Card.Content>

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
    </Card>
  );
};
DeviceDetails.displayName = "DeviceDetails";
export default DeviceDetails;

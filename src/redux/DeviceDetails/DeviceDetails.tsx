import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Card,
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
  const isConnected = deviceDetails.connectionState !== 'disconnected';
  const [colorLigthOption, setColorLigthOption] = React.useState('');
  const [activeColorArray, setActiveColorArray] = React.useState<ILightOption[]>([]);
  const [activeColorLigthOption, setActiveColorLigthOption] =
    React.useState<ILightOption>({
      key: "",
      name: "",
      tempInKelvin: 0,
      color: "",
    });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [percent, setPercent] = React.useState(0);
  const increment = () => {
    setPercent((prevState) => (prevState >= 100 ? 0 : prevState + 10));
    console.log('change temp/brightness in API source and display correct value');
  }
  const decrement = () => {
    setPercent((prevState) => (prevState <= 0 ? 100 : prevState - 10));
    console.log('change temp/brightness in API source and display correct value');
  }
  const lightOptionColor: ILightOption[] = [
    {
      key: "option-0",
      name: "Daylight",
      tempInKelvin: 6500,
      color: "#F1F5F8",
    },
    {
      key: "option-1",
      name: "Natural white",
      tempInKelvin: 5000,
      color: "#F9FAFC",
    },
    {
      key: "option-2",
      name: "Cool white",
      tempInKelvin: 4100,
      color: "#FFFCF6",
    },
    {
      key: "option-3",
      name: "Warm white",
      tempInKelvin: 3500,
      color: "#FFF6E5",
    },
    {
      key: "option-4",
      name: "Soft white",
      tempInKelvin: 2700,
      color: "#FFF3DB",
    },
  ];

  React.useEffect(() => {
    if (deviceDetails.type === 'bulb') {
      setColorLigthOption(deviceDetails.color)
      setPercent(deviceDetails.brightness)
    }
    if (deviceDetails.type === "temperatureSensor") {
      setPercent(() => {
        const min = 10
        const max = 40
        const value = deviceDetails.temperature
        return ((value - min) * 100 / (max - min))
      })
    }
  }, [deviceDetails]);
  React.useEffect(() => {
    if (deviceDetails.type === 'bulb') {
      setActiveColorArray(() => {
        const temp: ILightOption[] = lightOptionColor.filter(option => option.color === colorLigthOption)
        return temp
      })
    }
  }, [colorLigthOption]);
  React.useEffect(() => {
    if (deviceDetails.type === 'bulb' && activeColorArray.length > 0) {
      setActiveColorLigthOption(() => activeColorArray[0])
    }
  }, [activeColorArray]);
  React.useEffect(() => {
    if (deviceDetails.type === 'bulb' && activeColorLigthOption.key.length > 0) {
      setActiveIndex(() => {
        const tempIndex = parseFloat((activeColorLigthOption.key).slice(-1))
        return tempIndex
      })
    } else {
      setActiveIndex(0)
    }
  }, [activeColorLigthOption]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setActiveIndex(Number(e.target.value));

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
                <Button onClick={() => console.log('power on/off toggle')} circular>
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
                <div style={{ width: '100%', marginTop: '20px' }}>
                  <Progress percent={percent} indicating />
                </div>
                <Button onClick={increment} circular>
                  <Icon.Group size="big">
                    <Icon name="lightbulb outline" color="yellow" />
                    <Icon name="add" corner="bottom right" />
                  </Icon.Group>
                </Button>
              </div>
              <div style={{ textAlign: 'center' }}>Brightness: {deviceDetails.brightness}</div>
            </Segment>

            <Segment inverted color='grey'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Header as="h5" >
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
                  <div>Color light: {deviceDetails.type === "bulb" && lightOptionColor[activeIndex].name}</div>
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
          <Segment>
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
                <div style={{ width: '100%', marginTop: '20px' }}>
                  <Progress percent={percent} indicating />
                </div>
                <Button onClick={increment} circular>
                  <Icon.Group size="big">
                    <Icon name="thermometer full" size="large" color="red" />
                  </Icon.Group>
                </Button>
              </div>
            </Card.Content>
            <Card.Content textAlign="center">
              Temperature:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {deviceDetails.temperature} °C
              </span>
            </Card.Content>
          </Segment>
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
          onButtonClick={(e, data) => console.log(e, data)}
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

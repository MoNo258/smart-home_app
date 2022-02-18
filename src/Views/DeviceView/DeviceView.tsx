import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, ButtonProps, Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { DeviceDetailsAction } from "../../redux";

export const DeviceViewStyled = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  & .userView_card {
    width: 60%;
    margin: auto;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .ui.card > .image {
      padding-top: 1rem;
      background: none;
      border-radius: 50% !important;
    }
    & .ui.card > .content,
    .ui.card > .extra {
      border-top: none;
    }
  }
`;

const DeviceView: React.FC = () => {
  const navigate = useNavigate();
  const idParam = window.location.pathname;
  const [isDeleted, setIsDeleted] = React.useState(false);
  const dispatch = useGlobalDispatch();
  const deviceDetails = useGlobalState(
    (state) => state.deviceDetails.deviceDetails
  );
  const isLoading = useGlobalState((state) => state.deviceDetails.loading);

  React.useEffect(() => {
    dispatch(DeviceDetailsAction.fetchDeviceDetails(idParam.slice(1)));
  }, []);

  const visitHomepage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    navigate(`/`);
  };

  const sections = [
    { key: "Homepage", content: "Homepage", href: "/" },
    { key: "User details", content: "User details", active: true },
  ];
  const deleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    // deleteSingleUser(idParam.slice(1));
    setIsDeleted(true);
  };

  return (
    <DeviceViewStyled className="userView">
      <Breadcrumb icon="right angle" sections={sections} />
      <div className="userView_card">
        {!isDeleted ? (
          <Card fluid>
            <Image
              className="userView_image"
              centered
              size="medium"
              src={deviceDetails.type}
            />
            <Card.Content>
              <Card.Header textAlign="center">{deviceDetails.name}</Card.Header>
              <Card.Meta textAlign="center">{deviceDetails.id}</Card.Meta>
              <Card.Description textAlign="center">
                Type: {deviceDetails.type}
              </Card.Description>
              <Card.Description textAlign="center">
                state: {deviceDetails.connectionState}
              </Card.Description>
            </Card.Content>

            <Card.Content textAlign="center">
              <ButtonComponent
                loading={isLoading}
                isIcon
                iconName="trash"
                buttonText="Delete user"
                buttonColor="red"
                isBasic
                onButtonClick={(e, data) => deleteUser(e, data)}
              />
            </Card.Content>
          </Card>
        ) : (
          <Card fluid>
            <Card.Content textAlign="center">User is DELETED</Card.Content>
            <Card.Content textAlign="center">
              <ButtonComponent
                loading={isLoading}
                isIcon
                iconName="home"
                buttonText="Back to Homepage"
                buttonColor="blue"
                isBasic
                onButtonClick={(e, data) => visitHomepage(e, data)}
              />
            </Card.Content>
          </Card>
        )}
      </div>
    </DeviceViewStyled>
  );
};

export default DeviceView;

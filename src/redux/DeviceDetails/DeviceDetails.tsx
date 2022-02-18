import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "semantic-ui-react";
import NoMoreItems from "../../Components/NoMoreItems";
import { useGlobalState } from "../../helpers";

type DeviceDetailsProps = {
  propName?: string;
};
const DeviceDetails: React.FC<DeviceDetailsProps> = () => {
  const deviceDetails = useGlobalState(
    (state) => state.deviceDetails.deviceDetails
  );
  const isLoading = useGlobalState((state) => state.deviceDetails.loading);
  const navigate = useNavigate();
  const [usersTotal, setUsersTotal] = React.useState<number>(0);
  const [isAll, setIsAll] = React.useState(false);
  const [noUsers, setNoUsers] = React.useState(false);

  const showUser = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    login: string
  ) => {
    navigate(`/${login}`);
  };

  return (
    <List>
      {noUsers ? (
        <NoMoreItems information="There are no users! Let's add someone..." />
      ) : (
        <React.Fragment>
          <div>{deviceDetails.type}</div>
          <div>{deviceDetails.name}</div>
          <div>{deviceDetails.id}</div>
          <div>{deviceDetails.connectionState}</div>
        </React.Fragment>
      )}
      {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
    </List>
  );
};
DeviceDetails.displayName = "DeviceDetails";
export default DeviceDetails;

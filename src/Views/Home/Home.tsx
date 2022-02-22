import _times from "lodash/times";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuItemProps } from "semantic-ui-react";
import MenuComponent from "src/Components/MenuComponent";
import styled from "styled-components";
import SkeletonList from "../../Components/SkeletonList";
import { useGlobalDispatch, useGlobalState } from "../../helpers";
import { DevicesList } from "../../redux";

export const HomeStyled = styled.div`
  margin: 2rem;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const devicesList = useGlobalState((state) => state.devicesList.devicesList);
  const isLoading = useGlobalState((state) => state.devicesList.loading);
  const manySkeletons = _times(3, (i: number) => <SkeletonList key={i} />);
  const [activeItem, setActiveItem] = React.useState<string | undefined>(
    "devices"
  );

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => {
    console.log("clicked item:", data.name);
    setActiveItem(data.name);
  };

  return (
    <HomeStyled className="home">
      <MenuComponent
        activeItem={activeItem}
        handleMenuItemClick={handleMenuItemClick}
      />
      <DevicesList />
    </HomeStyled>
  );
};

export default Home;

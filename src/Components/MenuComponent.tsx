import * as React from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";

export type MenuComponentProps = {
  handleMenuItemClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => void;
  activeItem?: string;
};

const MenuComponent: React.FC<MenuComponentProps> = ({
  activeItem,
  handleMenuItemClick,
}) => {
  return (
    <Menu pointing>
      <Menu.Item
        name="devices"
        active={activeItem === "devices"}
        onClick={handleMenuItemClick}
      />
      <Menu.Item
        name="new"
        active={activeItem === "new"}
        onClick={handleMenuItemClick}
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
  );
};

export default MenuComponent;

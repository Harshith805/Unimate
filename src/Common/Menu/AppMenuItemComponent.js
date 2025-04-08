import ListItem from "@mui/material/ListItem";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { styles } from "../../Styles/Stylesheet.css";
import { useStateValue } from "./../../StateProvider";


const AppMenuItemComponent = (props) => {
  const { onClick, link, children, drawerOpen, onChange } = props;
  const [{ apiSpinner }, dispatch] = useStateValue();

  const classes = styles();

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== "string") {
    return (
      <ListItem
      style={{pointerEvents:"none"}}

        button
        children={children}
        onClick={onClick}
        classes={{
          root: clsx({
            [classes.menuItem]: drawerOpen,
            [classes.menuCloseItem]: !drawerOpen,
          }),
        }}
      />
    );
  }

  // Return a ListItem with a link component
  return (
    <ListItem
      button
      style={{pointerEvents: apiSpinner ? "none" : "all"}}

      classes={{
        root: clsx({
          [classes.menuItem]: drawerOpen,
          [classes.menuCloseItem]: !drawerOpen,
        }),
      }}
      children={children}
      component={forwardRef((props: NavLinkProps, ref: any) => (
        <NavLink exact {...props} innerRef={ref} />
      ))}
      to={link}
    />
  );
};

export default React.memo(AppMenuItemComponent);

import IconExpandLess from "@mui/icons-material/ExpandLess";
import IconExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { styles } from "../../Styles/Stylesheet.css";
import AppMenuItemComponent from "./AppMenuItemComponent";
import { useStateValue } from "./../../StateProvider";

const AppMenuItem = (props) => {
  const { name, href, Icon, drawerOpen, items = [], onChange } = props;
  const classes = styles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  const [{ apiSpinner }, dispatch] = useStateValue();
  function handleClick() {
    setOpen(!open);
    onChange()
  }
  useEffect(() => {
    setOpen(drawerOpen);
  }, [drawerOpen]);
  const MenuItemRoot = (
    <AppMenuItemComponent
      link={href}
      onClick={handleClick}
      drawerOpen={drawerOpen}
      onChange={onChange}
    >
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon className={classes.menuItemIcon}>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText
        style={{ pointerEvents:apiSpinner ? "none" : "all"}}
        primary={name}
        inset={!Icon}
        classes={{
          root: classes.listItemText,
          primary: classes.listItemTextPrimary,
        }}
      />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </AppMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding style={{ pointerEvents:apiSpinner ? "none" : "all"}}>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} drawerOpen={drawerOpen} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

export default React.memo(AppMenuItem);

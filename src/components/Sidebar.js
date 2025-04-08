import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CastIcon from '@mui/icons-material/Cast';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import PaletteIcon from "@mui/icons-material/Palette";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import clsx from "clsx";
import __ from "lodash";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import AppMenuItem from "../Common/Menu/AppMenuItem";
import ScrollToTop from "../Common/ScrollToTop";
import { useStateValue } from "../StateProvider";
import { styles } from "../Styles/Stylesheet.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UIDarkLogo from "../images/UIDarkLogo.png";
import UILightLogo from "../images/UILightLogo.png";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import TaskIcon from '@mui/icons-material/Task';
import TocIcon from '@mui/icons-material/Toc';
import ReportIcon from '@mui/icons-material/Report';
import Shop2Icon from '@mui/icons-material/Shop2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const items = [
  {
    href: "/testplan",
    Icon: AccessTimeIcon,
    name: "Test Plan",
  },
  {
    href: "/testexecution",
    Icon: Shop2Icon,
    name: "Test Execution",
  },
  {
    href: "/testreport",
    Icon: ReportIcon,
    name: "Test Report",
  },
  {
    href: "/templates",
    Icon: TocIcon,
    name: "Templates",
  },
  {
    href: "/tasks",
    Icon: TaskIcon,
    name: "Tasks",
  }
];

function Sidebar() {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  // const handleAccountCircle = () => {
  //   if (window.location.pathname != "/") {
  //     history.replace("/userPCSQ");
  //   } else {
  //     history.push("userPCSQ");
  //   }
  // };
  const [{ headerData, showSidebar, theme }, dispatch] = useStateValue();
  const [themeValue, setThemeValue] = React.useState(theme);
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const [menuItems, setMenuItems] = useState([...items]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalMessage, setModalMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiModalMessage, setApiModalMessage] = useState()
  const [errorMesage, setErrorMessage] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    // if(type){
    //   if (window.location.pathname != "/") {
    //     history.replace(`/${type}`);
    //   } else {
    //     history.push(`${type}`);
    //   }
    // }
    setAnchorEl(null);
  };

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);
  // useEffect(() => {
  //   if (pcsqSupplierData.length > 0) {
  //     const uniqueBUs = Array.from(
  //       new Set(pcsqSupplierData.map((item) => item["Header_Primary BU"]))
  //     );
  //     const filterBUs = uniqueBUs.filter((element) => element != "#N/A");
  //     const items = [
     
  //       {
  //         href: "/cast",
  //         Icon: CastIcon,
  //         name: "Test Feed",
  //       },
  //       {
  //         href: "/schedule",
  //         Icon: ScheduleIcon,
  //         name: "Speed Board",
  //       },
  //       {
  //         href: "/insights",
  //         Icon: InsightsIcon,
  //         name: "Insights",
  //       },
  //     ];
  //     setMenuItems(items);
  //   }
  // }, [pcsqSupplierData]);

  const themeHandleChange = useCallback((event) => {
    setThemeValue(event.target.value);
    dispatch({ type: "SET_THEME", theme: event.target.value });
  }, []);

  const handleClickThemeChange = () => {
    if (themeValue == "darkTheme") {
      setThemeValue("lightTheme");
      dispatch({ type: "SET_THEME", theme: "lightTheme" });
    } else if (themeValue == "lightTheme") {
      setThemeValue("darkTheme");
      dispatch({ type: "SET_THEME", theme: "darkTheme" });
    }
  };

  const handleonClickAlertBox = (openValue) => {
    setErrorMessage("");
    setErrorOccurred(openValue);
  };

  const closeAlert = (openValue) => {
    setErrorMessage("");
    setErrorOccurred(openValue);
  };


  return (
    showSidebar && <>
      {/* <div className={classes.root}> */}
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {showSidebar && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
           )}
          <img
            src={theme == "darkTheme" ? UILightLogo : UIDarkLogo }
            alt="logo"
            className={clsx(classes.appLogo)}
          />
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              className={classes.title}
              style={{ marginTop: "3px", fontWeight: "bold" }}
            >
              <p>Unimate</p>
             </Typography>
            <Typography
              variant="h8"
              className={classes.title}
              style={{
                // marginTop: "9px",
                letterSpacing: "2px",
              }}
            >
              The Automation
            </Typography>
          </div>
            <div>
              <Typography
                variant="h8"
                className={classes.title}
                style={{
                  letterSpacing: "2px",
                }}
              >
                {headerData.Project}
              </Typography>
              {showSidebar && <IconButton
                //onClick={handleAccountCircle}
                id="fade-button"
                aria-controls={open1 ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon
                  className={classes.circleIcon}
                  fontSize="large"
                />
              </IconButton>}
            </div>
        </Toolbar>
      </MuiAppBar>
      <ScrollToTop />
      {open && (
        <div
          onClick={handleDrawerClose}
          className={classes.backDrop}
          style={{
            opacity: 1,
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        ></div>
      )}
        <MuiDrawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.menuButton}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </div>
          <div
            className={clsx({
              [classes.listClass]: open,
              [classes.listClassClose]: !open,
            })}
          >
            <List>
              {menuItems.map((item, index) => (
                <AppMenuItem
                  {...item}
                  key={index}
                  drawerOpen={open}
                  onChange={handleDrawerOpen}
                />
              ))}
            </List>
            <Divider />
            <div style={{ position: "absolute", bottom: "0px" }}>
              <List>
                  <ListItem
                  button
                  autoFocus={true}
                  classes={{
                    // button: classes.listButton,
                    gutters: classes.listgutters,
                    root: classes.listItemRoot,
                  }}
                >
                <ListItemIcon
                    onClick={handleClickThemeChange}
                    className={classes.menuItemIcon}
                  >
                    <PaletteIcon fontSize="medium"/>
                  </ListItemIcon>
                  {open && (
                    <ListItemText classes={{ root: classes.listItemPrimary }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "no-wrap",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <button className={classes.themeButton}>
                            <FormControl component="fieldset">
                              <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                value={themeValue}
                                onChange={themeHandleChange}
                              >
                                <FormControlLabel
                                  value="lightTheme"
                                  classes={{
                                    label: classes.labelThemeText,
                                    root: classes.labelAlignment,
                                  }}
                                  control={
                                    <Radio
                                      style={{ color: "#00AB8E" }}
                                      size="small"
                                    />
                                  }
                                  label="Light   /"
                                />
                                <FormControlLabel
                                  value="darkTheme"
                                  control={
                                    <Radio
                                      style={{ color: "#00AB8E" }}
                                      size="small"
                                    />
                                  }
                                  label="Dark"
                                  classes={{
                                    label: classes.labelThemeText,
                                    labelPlacementStart:
                                      classes.labelStartAlignment,
                                  }}
                                  labelPlacement="start"
                                />
                              </RadioGroup>
                            </FormControl>
                          </button>
                        </div>
                      </div>
                    </ListItemText>
                  )}
                </ListItem>
              </List>
            </div>
          </div>
        </MuiDrawer>
    </>
  );
}
export default React.memo(Sidebar);

import { makeStyles } from "@mui/styles";

const drawerWidth = 250;

const styles = makeStyles(
  (theme) => ({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "6px",
        height: "5px",
        zIndex: 99999,
        cursor: "pointer",
      },
      "*::-webkit-scrollbar-track": {
        // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        background: theme.palette.primary.light,
        borderRadius: "5px",
        cursor: "pointer",
      },
      "*::-webkit-scrollbar-thumb": {
        background: theme.scrollBar.gray,
        borderRadius: "5px",
        cursor: "pointer",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        background: theme.scrollBar.gray,
      },
      // "*:hover::-webkit-scrollbar": {
      //   width: "10px",
      //   zIndex: 99999,
      // },
    },
    disclaimerForm: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
      marginTop: "1.5rem",
    },
    icon: {
      borderRadius: 3,
      padding: 0,
      width: 16,
      height: 16,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: theme.palette.common.iconColor,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "$root.Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.common.iconBackground,
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: theme.palette.common.color4,
      },
    },
    checkedIcon: {
      backgroundColor: theme.palette.common.checkedIcon,
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.common.checkedIcon,
      },
    },
    disclaimerButton: {
      borderRadius: "0px",
      marginTop: "10px",
      lineHeight: "40px",
      padding: "0px",
      width: "100%",
      color: "#fff",
      //padding: "15px",
      background: theme.palette.common.buttonColor,
      "&:disabled": {
        background: theme.palette.common.disabledColor,
      },
      "&:hover": {
        background: theme.palette.common.buttonColor,
      },
    },
    backDrop: {
      position: "fixed",
      display: "flex",
      "-webkit-box-align": "center",
      "align-items": "center",
      "-webkit-box-pack": "center",
      "justify-content": "center",
      inset: "0px",
      // backgroundColor: 'black',
      "-webkit-tap-highlight-color": "transparent",
      zIndex: 1,
    },
    inputBackground: {
      // backgroundColor:"inherit",
      // color:theme.inputBackground.color,
      marginLeft: "5px",
      // paddingLeft: "15px",
      borderRadius: "11px",
      border: "none",
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.background.default,
      flex: 1,
    },
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.main,
      boxShadow: "none",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      zIndex: 3,
      boxShadow: "none",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    switchBase: {
      "& .MuiSwitch-switchBase": {
        "&.Mui-checked": {
          color: theme.palette.common.white,
          "& + .MuiSwitch-track": {
            backgroundColor: theme.palette.common.checkedIcon,
            opacity: 1,
            border: 0,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          color:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        color: theme.graph.orange,
      },
      "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
          duration: 500,
        }),
      },
    },
    failedSwitchBase: {
      "& .MuiSwitch-switchBase": {
        "&.Mui-checked": {
          color: theme.palette.common.white,
          "& + .MuiSwitch-track": {
            backgroundColor: theme.palette.common.color1,
            opacity: 1,
            border: 0,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          color:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        color: theme.graph.orange,
      },
      "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
          duration: 500,
        }),
      },
    },
    menuButton: {
      marginRight: 10,
      color: theme.palette.text.primary,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    hideDrawer: {
      display: "none",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      border: "none",
      //boxShadow: "0px 3px 8px rgb(0 0 0 / 60%)",
      backgroundColor: theme.palette.primary.mainLight,
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      //boxShadow: "0px 3px 8px rgb(0 0 0 / 60%)",
      width: "53px",
      border: "none",
      [theme.breakpoints.up("sm")]: {
        width: "53px",
      },
      backgroundColor: theme.palette.primary.main,
    },
    appLogo: {
      pointerEvents: "none",
      objectFit: "contain",
      maxHeight: "2.5rem",
      margin: ".1%",
    },
    title: {
      marginLeft: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    fetchResetButton: {
      width: "100%",
      borderRadius: "0px",
      background: theme.palette.common.buttonColor,
      color: theme.palette.common.white,
      fontWeight: "bold",
      padding: "0px 6px 1px 6px",
      lineHeight: "40px",
      marginTop: "20px",
      "&:hover": {
        background: theme.palette.common.buttonColor,
      },
      "&:disabled": {
        color: theme.palette.common.white,
        background: theme.palette.common.disabledColor,
      },
    },
    labelThemeText: {
      fontSize: "0.7rem",
    },
    listgutters: {
      paddingLeft: "16px",
      paddingRight: "0px",
    },
    listItemPrimary: {
      "& .MuiTypography-root": {
        float: "right",
      },
    },
    listItemRoot: {
      paddingTop: "0px",
    },
    popupIndicator: {
      color: theme.palette.common.color6,
    },
    labelAlignment: {
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      marginRight: "0px",
      verticalAlign: "middle",
    },
    labelStartAlignment: {
      marginLeft: "5px",
      marginRight: "-11px",
      flexDirection: "row-reverse",
    },
    progressbar: {
      height: 15,
      width: 300,
      borderRadius: "10px",
      "&.MuiLinearProgress-determinate": {
        color: "yellow",
        backgroundColor: theme.palette.background.default,
      },
    },
    progressbar1: {
      backgroundColor: theme.palette.common.progressBar,
    },
    label: {
      marginLeft: "4px",

      /*"&.Mui-focused":{
      color:theme.palette.text.primary
    }*/
    },
    listClass: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "100%",
      //justifyContent: "space-between",
      padding: "0 16px",
    },
    listClassClose: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      //justifyContent: "space-between",
      position: "relative",

      //padding: "0 16px",
    },
    menuItem: {
      color: theme.palette.secondary.dark,
      border: "1px solid #40404b",
      borderRadius: "20px",
      padding: "0 16px",
      lineHeight: "40px",
      margin: "4px 0 0",
      backgroundColor: theme.palette.info.main,
      "&.active": {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.white,
        "& .MuiListItemIcon-root": {
          color: theme.palette.common.white,
        },
      },
      "&:hover": {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.white,
        "& .MuiListItemIcon-root": {
          color: theme.palette.common.white,
        },
      },
    },
    menuCloseItem: {
      color: theme.palette.text.secondary,
      "&.active": {
        color: theme.palette.common.white,
        "& .MuiListItemIcon-root": {
          color: theme.palette.info.dark,
        },
      },
    },
    menuItemIcon: {
      //color: theme.palette.common.black,
      color: theme.palette.secondary.dark, //dark theme
      minWidth: "40px",
      //color:'#767676' //light theme
    },
    themeButton: {
      background: theme.palette.info.main,
      textTransform: "capitalize",
      borderRadius: "30px",
      border: "1px solid #535B62",
      paddingLeft: "10px",
      paddingRight: "10px",
      marginLeft: "12px",
      color: theme.palette.text.secondary,
    },
    circleIcon: {
      color: theme.palette.circleIcon.color,
    },
    menuPaper: {
      background: theme.palette.info.main,
    },
    input: {
      fontSize: "large",
      borderColor: theme.palette.common.color5,
    },
    autocompleteselect: {
      background: theme.palette.secondary.main,
      borderColor: theme.palette.common.color5,
      borderWidth: "0px",
      borderRadius: "0px",
      width: "100%",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.palette.primary.dark,
          borderRadius: "0px",
        },
        "&:hover fieldset": {
          borderColor: theme.palette.common.color5,
        },
        "&.Mui-disabled fieldset": {
          borderColor: theme.palette.primary.dark,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.dark,
        },
      },
    },
    listbox: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.main.light,
      minWidth: "100%",
    },
    inputRoot: {
      overflowX: "hidden",
      flexWrap: "noWrap !important",
      padding: "1px 6px 0px 6px !important",
      borderRadius: "0px",
      fontSize: "inherit",
      borderColor: theme.palette.common.color5,
      "&:hover": {
        borderRadius: "0px",
      },
    },
    feedbackButton: {
      width: "100%",
      background: theme.palette.common.buttonColor,
      // background: "#1fb5e4",
      fontWeight: "bold",
      color: theme.palette.common.white,
      padding: "0px 6px 1px 6px",
      lineHeight: "40px",
      marginTop: "20px",
      "&:hover": {
        background: theme.palette.common.buttonColor,
      },
      "&:disabled": {
        color: theme.palette.common.white,
        background: theme.palette.common.disabledColor,
      },
    },
    footerStyle: {
      position: "fixed",
      bottom: 0,
      left: 65,
      right: 0,
      textAlign: "left",
      backgroundColor: theme.palette.background.default,
      borderTop: `1px solid "${theme.palette.primary.main}"`,
      zIndex:1
    },
  }),
  { index: 1 }
);
export { styles };

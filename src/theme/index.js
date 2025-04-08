import { createTheme} from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    background: {
      default: "#1F1F1F",
    },
    primary: {
      contrastText: "#",
      main: "#333333",
      mainLight: "#333333",
      light: "#282d31",
      dark: "#373737",
    },
    common: {
      black: "#000",
      white: "#fff",
      checkedIcon: "#00AB8E",
      buttonColor: "#E4551F",
      switchBaseColor: "#00AB8E",
      failedSwitchBaseColor: "#c44848",
      disabledColor: "gray",
      iconColor: "#F5F8FA",
      progressBar: "#fff",
      iconBackground: "#EBF1F5",
      linksResourcesBG: "#2aacb5",
      color1: "#c44848",
      color2: "#282d31",
      color3: "#4391DE",
      color4: "rgba(206,217,224,.5)",
      color5: "#ccc",
      color6: "#535B62",
    },
    secondary: {
      main: "#252525",
      light: "#FFF",
      dark: "#788189",
    },
    info: {
      main: "#373737",
      light: "#E4551F",
      dark: "#FFF",
    },
    text: {
      primary: "#AAAFB2",
      secondary: "#788189",
      disabled: "#40464B",
    },
    circleIcon: {
      color: "#fff",
    },
  },
  scrollBar: {
    gray: "gray",
  },
  cardComments: {
    light: "#282d31",
    color: "#d1d6da",
  },
  inputBackground: {
    light: "#323639",
    color: "#d1d6da",
  },
  graph: {
    red: "#f24040",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    green1: "#50D264",
    green2: "#00AB8E",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#ccc",
          },
          "&$disabled": {
            borderColor: "#535B62",
          },
          "&$focused fieldset": {
            borderColor: "red",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          "& .PrivatePickersToolbar-root": {
            backgroundColor: "#E4551F",
            "& .MuiTypography-root": {
              color: "#fff",
            },
            "& .MuiIconButton-root": {
              color: "#fff",
            },
          },
          "& .MuiCalendarPicker-root": {
            color: "#000",
          },
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-selected": {
            color: "#fff !important",
            backgroundColor: "#E4551F !important",
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: "0.875rem",
          lineHeight: 1.43,
        },
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflowX: "hidden",
        },
        a: {
          textDecoration: "none",
        },
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#AAAFB2",
          fontSize: "0.875rem",
          marginBottom: "8px",
          "&$focused": {
            color: "AAAFB2",
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#F0F0F0",
    },
    primary: {
      contrastText: "#FFF",
      main: "#D1D1D1",
      mainLight: "#D1D1D1",
      light: "#ddd",
      dark: "#EFEFEF",
    },
    common: {
      black: "#000",
      white: "#fff",
      checkedIcon: "#00AB8E",
      buttonColor: "#E4551F",
      disabledColor: "gray",
      iconColor: "#F5F8FA",
      iconBackground: "#EBF1F5",
      switchBaseColor: "#00AB8E",
      failedSwitchBaseColor: "#c44848",
      linksResourcesBG: "#2aacb5",
      progressBar: "#1F1F1F",
      color1: "#c44848",
      color2: "#282d31",
      color3: "#4391DE",
      color4: "rgba(206,217,224,.5)",
      color5: "#ccc",
      color6: "#535B62",
    },
    secondary: {
      main: "#FBFBFB",
      light: "#000",
      dark: "#787878",
    },
    info: {
      main: "#C7C7C7",
      light: "#E4551F",
      dark: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#ADADAD",
    },
    graphColor: {
      passBackGroundColor: "#50D264",
      failBackGroundColor: "#FF525C",
      tooltipBackGroundColor: "red",
    },
    circleIcon: {
      color: "#000",
    },
  },
  scrollBar: {
    gray: "gray",
  },
  cardComments: {
    light: "#FFF",
    color: "#787878",
  },
  inputBackground: {
    light: "#aaafb22e",
    color: "#787878",
  },
  graph: {
    red: "#f24040",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    green1: "#50D264",
    green2: "#00AB8E",
  },

  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        toolbar: {
          backgroundColor: "#E4551F",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .PrivatePickersToolbar-root": {
            backgroundColor: "#E4551F",
            "& .MuiTypography-root": {
              color: "#fff",
            },
            "& .MuiIconButton-root": {
              color: "#fff",
            },
          },
          "& .MuiCalendarPicker-root": {
            color: "#000",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "orange",
            "& .MuiSwitch-thumb:before": {
              color: "green",
            },
          },
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-selected": {
            color: "#fff !important",
            backgroundColor: "#E4551F !important",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#707070",
            borderRadius: "0px",
          },
          "&:hover fieldset": {
            borderColor: "#ccc",
          },
          "&.Mui-disabled fieldset": {
            borderColor: "#707070",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#707070",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: "0.875rem",
          lineHeight: 1.43,
        },
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflowX: "hidden",
        },
        a: {
          textDecoration: "none",
        },
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          fontSize: "0.875rem",
          marginBottom: "8px",
          "&$focused": {
            color: "#000",
          },
        },
      },
    },
  },
});


export { darkTheme, lightTheme }

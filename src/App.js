import React from "react";
import useState from "react-usestateref";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import __ from "lodash";

import AlertDialog from "./Common/AlertDialog";
import Templates from "./Templates";
import { fetchToken } from "./Services/AuthService";
import CoverPage from "./CoverPage";
import Tasks from "./Tasks";


const App = (props) => {
  const [{ APIAddress, theme }, dispatch] = useStateValue();
  const [themeValue, setThemeValue] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    fetchToken(); // Fetch token on app load
  }, []);

  const handleonClickAlertBox = (openValue) => {
    setErrorMessage("");
    setErrorOccurred(openValue);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={theme === "lightTheme" ? lightTheme : darkTheme}
      >
        <React.Fragment>
          <div>
            <BrowserRouter>
              <AlertDialog
                open={errorOccurred}
                message={errorMesage}
                api="HomePage"
                handleonclick={handleonClickAlertBox}
              />
              <Switch>
                <Route exact path="/" component={CoverPage} />
                <main
                  style={{
                    flexGrow: 1,
                    padding: "24px 12px 24px 28px",
                    maxWidth: "100vw",
                    width: "100vw",
                    marginLeft: "1vw",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      padding: "24px 8px",
                    }}
                  />
                  <Sidebar />
                  <Route exact path="/templates" component={Templates} />
                  <Route exact path="/tasks" component={Tasks} />
                </main>
              </Switch>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default React.memo(App);

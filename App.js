import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Messages from "./src/pages/Messages";
import Requests from "./src/pages/Requests";
import Settings from "./src/pages/Settings";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import SideBar from "./src/Components/SideBar";
import { useState } from "react";
import {
  CardHeader,
  Switch,
  Box,
  Container,
  FormGroup,
  FormControlLabel,
  CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define theme settings
const light = {
  palette: {
    mode: "light"
  }
};
const dark = {
  palette: {
    mode: "dark"
  }
};
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <BrowserRouter>
      <SideBar>
        <div className="theme">
          <ThemeProvider
            theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
          >
            <CssBaseline />
            <Container>
              <div className="App">
                <Box component="div" p={5}></Box>

                <CardHeader
                  action={
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isDarkTheme}
                            onChange={changeTheme}
                          />
                        }
                        label="Theme"
                      />
                    </FormGroup>
                  }
                />
              </div>
            </Container>
          </ThemeProvider>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
};

export default App;

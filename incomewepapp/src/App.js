import React, { createContext } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import MySidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import VendorsScreen from "./scenes/vendorsScreen/VendorsScreen";
import LogoutScreen from "./scenes/global/LogoutScreen";
import IncomeView from "./scenes/incomes/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./scenes/theme";
import LoginScreen from "./scenes/global/loginScreen";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import {store, persistor} from "./data/store";
import VendorDetailScreen from "./scenes/vendorsScreen/VendorDetailScreen";
import HomepageAnalysis from "./scenes/analysis";




function App(props) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <div className="app">
            <MySidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/login/" element={<LoginScreen />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/vendors/" element={<VendorsScreen />} />
                <Route path="/vendor/:vendor_id" element={<VendorDetailScreen />} />
                <Route path="/incomes/" element={<IncomeView />} />
                <Route path='/analysis/' element={<HomepageAnalysis />} />
                <Route path="/logout/" element={<LogoutScreen />} />
              </Routes>
                  
                
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;

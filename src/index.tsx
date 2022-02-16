import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// there is an extra semicolon in this file so until this is fixed I switched to cdn (added in index.html)
// https://github.com/Semantic-Org/Semantic-UI-CSS
// import "semantic-ui-css/semantic.min.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReduxProvider, UsersList } from "./redux";
import { Home } from "./Views/Home";
import { SingleView } from "./Views/SingleView";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./@mocks/browser");
  worker.start();
}

const GlobalStyle = createGlobalStyle`
  body {
    background: #F5F6FB;
    box-sizing: border-box;
   }
`;

const App = () => {
  return (
    <div className="body-wrapper">
      <ThemeProvider theme={{ fontFamily: "sans-serif" }}>
        <GlobalStyle />
        <BrowserRouter>
          <ReduxProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<SingleView />} />
              <Route path="/list" element={<UsersList />} />
            </Routes>
          </ReduxProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

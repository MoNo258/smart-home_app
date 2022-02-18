import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { AnyAction } from "redux";
import { createLogger } from "redux-logger";
import DeviceDetailsReducer from "./DeviceDetails/DeviceDetails.slice";
import DevicesListReducer from "./DevicesList/DevicesList.slice";

const store = configureStore({
  reducer: {
    // teamsList: TeamsReducer,
    devicesList: DevicesListReducer,
    deviceDetails: DeviceDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createLogger({
        collapsed: true,
        duration: true,
        timestamp: true,
      })
    ),
});

const GlobalReduxStore: React.FC = (props) => (
  <Provider store={store}>{props.children}</Provider>
);

//TYPES
export type GlobalState = ReturnType<typeof store["getState"]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReduxDispatch = ThunkDispatch<GlobalState, any, AnyAction>;

export type ThunkResult<R> = ThunkAction<R, GlobalState, undefined, AnyAction>;
// R -> Return Value
// GlobalState -> STate type for getSTate
// undefined -> "Extra argument": the thunk middleware can be customized to pass in an extra value
// AnyAction -> Action types accepted by dispatch

export default GlobalReduxStore;

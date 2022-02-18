import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDeviceDetails } from "../../Api";
import { createAsyncAction } from "../../helpers";

export const initialState: DevicesDetailsState = {
  deviceDetails: {} as SmartDeviceDetails,
  loading: true,
};

const fetchDeviceDetails = createAsyncAction(
  "request-Users/fetchDeviceDetails",
  async (deviceId: string) => {
    try {
      const response = await getDeviceDetails(deviceId);
      return response;
    } catch (error) {
      return console.log(error); //error type can be corrected FIXME:
    }
  }
);
const slice = createSlice({
  name: "request-Users",
  initialState,
  reducers: {
    setDevice: (
      state,
      action: PayloadAction<DevicesDetailsState["deviceDetails"]>
    ) => {
      state.deviceDetails = action.payload;
    },
    setLoading: (
      state,
      { payload }: PayloadAction<DevicesDetailsState["loading"]>
    ) => {
      state.loading = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDeviceDetails.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchDeviceDetails.fulfilled, (state, { payload }) => {
      state.deviceDetails = payload as SmartDeviceDetails;
      state.loading = false;
    });
    builder.addCase(fetchDeviceDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default slice.reducer;

export const DeviceDetailsAction = {
  ...slice.actions,
  fetchDeviceDetails,
};

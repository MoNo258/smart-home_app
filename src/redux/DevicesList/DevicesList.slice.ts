import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDevices } from "../../Api";
import { createAsyncAction } from "../../helpers";

export const initialState: DevicesListState = {
  devicesList: [],
  loading: true,
};

const fetchDevices = createAsyncAction(
  "request-Users/fetchDevices",
  async () => {
    try {
      const response = await getDevices();
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
    setList: (
      state,
      action: PayloadAction<DevicesListState["devicesList"]>
    ) => {
      state.devicesList = action.payload;
    },
    setLoading: (
      state,
      { payload }: PayloadAction<DevicesListState["loading"]>
    ) => {
      state.loading = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.devicesList = payload as SmartDevice[];
      state.loading = false;
    });
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default slice.reducer;

export const DevicesListAction = {
  ...slice.actions,
  fetchDevices,
};

// src/mocks/handlers.js
import { rest } from "msw";
import { allDevicesBasic, fakeDeviceDetails } from "./fakers";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  // rest.get("/users", (req, res, ctx) => {
  //   Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem("is-authenticated");
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized",
  //       })
  //     );
  //   }
  //   If authenticated, return a mocked user details
  //   return res(ctx.status(200), ctx.json(fakeUsersArray as IUser[]));
  // }),

  rest.get("/api/v1/devices", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allDevicesBasic as SmartDevice[]));
  }),

  rest.get(`/api/v1/devices/:deviceId`, (req, res, ctx) => {
    const { deviceId } = req.params as unknown as MockDeviceIdInterface;
    return res(
      ctx.status(200),
      ctx.json(fakeDeviceDetails[deviceId] as SmartDeviceDetails)
    );
  }),
];

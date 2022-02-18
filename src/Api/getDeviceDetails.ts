export async function getDeviceDetails(deviceId: string) {
  try {
    const response = await fetch(`/api/v1/devices/${deviceId}`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`,
      },
    });
    if (response.status === 200) {
      return (await response.json()) as SmartDeviceDetails;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

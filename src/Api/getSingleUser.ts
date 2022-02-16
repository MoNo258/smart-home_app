export async function getSingleUser(username: string) {
  try {
    const response = await fetch(`/users/${username}`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`,
      },
    });
    if (response.status === 200) {
      return (await response.json()) as IUser;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

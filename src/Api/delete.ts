export async function deleteMethod(id: string) {
  try {
    const response = await fetch(`api to delete user/${id}`, {
      method: "DELETE",
      headers: {
        Accept: `application/json;odata=nometadata;`,
      },
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: string;
        description: string;
        full_name: string;
        id: string;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

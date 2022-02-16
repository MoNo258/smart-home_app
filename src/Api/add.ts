export async function add(
  avatar: string,
  description: string,
  name: string,
  typeId: string
) {
  let postData = {
    avatar_url: avatar,
    description: description,
    name: name,
    type: typeId,
  };
  try {
    const response = await fetch(`api to add user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: string;
        description: string;
        full_name: string;
        type: string;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

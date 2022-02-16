export async function getTopRated(page: number) {
  const key = "07110192b3fd8b432cc796b4c48dd507";
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: `application/json;odata=nometadata;`,
        },
      }
    );
    if (response.status === 200) {
      return (await response.json()) as IMoviesList;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

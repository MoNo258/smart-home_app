interface IGenres {
  id: number;
  name: string; //FIXME: create type
}
interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string; //FIXME: create type
}
interface IProductionCountries {
  iso_3166_1: string; //FIXME: create type
  name: string; //FIXME: create type
}

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string; //FIXME: create type
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string; //FIXME: create type?
      iso_639_1: string; //FIXME: create type
      name: string; //FIXME: create type?
    }
  ];
  status: string; //FIXME: create type
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieShort {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string; //FIXME: create type
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface IMoviesList {
  page: number;
  results: IMoviePopular[];
  total_pages: number;
  total_results: number;
}

interface IMovieBasic {
  id: number;
  overview: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

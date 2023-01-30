export const getMovieList = async ({ type }) => {
  const API = 'https://api.themoviedb.org/3/movie';
  const API_KEY = '50fbc1329ab1e0bc17ffaf32ac34fa4a';
  const response = await fetch(`${API}/${type}?api_key=${API_KEY}`);
  return response.json();
};

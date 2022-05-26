export default function fetchCountries(name) {
  const URL = 'https://restcountries.com/v2/name/';
  const options = 'fields=name,capital,populations,flags,languages';
  return fetch(`${URL}${name}${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

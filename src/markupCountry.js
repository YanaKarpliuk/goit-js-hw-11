export default function createCountryMarkup(item) {
  if (!item) return '<h3>Not found</h3>'

  return `
    <div>
      <div class="info-header">
        <img class="img" src="${item.flags.svg}" alt="${item.name.official}">
        <h2>${item.name.official}</h2>
      </div>
      <ul class="info-list">
        <li><span class="info-title">Capital:</span> ${item.capital}</li>
        <li><span class="info-title">Population:</span> ${item.population}</li>
        <li><span class="info-title">Languages:</span> ${Object.values(item.languages).join(', ')}</li>
      </ul>
    </div>
  `
}
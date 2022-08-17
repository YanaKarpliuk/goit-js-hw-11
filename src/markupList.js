export default function createMarkupList (items) {
  return items.map(item =>
  `
    <li class="list-item"><img class="img" src="${item.flags.svg}" alt="${item.name.official}"/>${item.name.official}</li>
  `).join('')
}
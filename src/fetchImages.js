import axios from "axios"

const KEY = '29489269-3576e9005305f56e263ffe0aa'

axios.defaults.baseURL = 'https://pixabay.com/api/'

export default async function fetchImg (query, currentPage, perPage) {
    const response = await axios.get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`,
    )
    return response
  }

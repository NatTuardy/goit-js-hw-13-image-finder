// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

const baseUrl = 'https://pixabay.com/api/';
const myKey = '16043897-ab8e24fa19c26825a4377ea35';

export default {
  page: 1,
  query: '',
  fetchArticles(query) {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${myKey}`;
    return fetch(baseUrl + requestParams)
      .then(responce => responce.json())
      .then(parsedResponce => {
        this.incrementPage();
        return parsedResponce.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};

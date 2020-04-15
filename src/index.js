import './styles.css';
import newsService from './js/services/news-service';
import spinner from './js/spinner';
import articleListItemsTemplate from './tamplates/article-list-item.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', createPhoto);

function searchFormSubmitHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;
  clearListItems();
  newsService.resetPage();
  newsService.searchQuery = input.value;
  spinner.show();

  newsService.fetchArticles().then(articles => {
    spinner.hide();
    insertListItems(articles);
  });
}

function loadMoreBtnHandler(e) {
  spinner.show();
  newsService
    .fetchArticles()
    .then(articles => {
      spinner.hide();
      insertListItems(articles);
    })
    .then(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    });
}

function insertListItems(items) {
  const markup = articleListItemsTemplate(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function createPhoto(e) {
  if (e.target.nodeName === 'IMG') {
    const instance = e.target.dataset.url;
    basicLightbox
      .create(
        `
    <img src="${instance}" width="800" height="600">
`,
      )
      .show();
  }
}

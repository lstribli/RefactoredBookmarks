import $ from 'jquery';
import store from './store';
import errors from './errors';
import pages from './pages';


function BookmarkItself(bookmark) {
  let id = store.expanded;
  if (id === bookmark.id) {
    return `
      <div class="bookmark" data-bookmark-id="${store.findById(id).id}">
                  <div class="expanded">
                    <button type="button" id='compress'>Compress</button>
                    ${store.findById(id).title}
                    <div class="display-rating">
                    ${renderRating(store.findById(id))}
                    </div>
                  </div>
                  <a href="${store.findById(id).url}" target="_blank">${bookmark.url}</a>
                  <p>${store.findById(id).desc}</p>
                  <button type="button" class="edit">Edit</button>
                  <button type="button" class="delete">Delete</button>
                </div>`;
  }
  else {
    return `
      <div class="bookmark" data-bookmark-id="${bookmark.id}">
                  <div class="compressed">
                    <button type="button" id="expand">Expand</button>
                    ${bookmark.title}
                    <div class="display-rating">
                      ${renderRating(bookmark)}
                    </div>
                  </div>
                </div>`;
  }
}
function renderEntireApp(bookmarks) {
  const bookmark = bookmarks.map(bookmark => BookmarkItself(bookmark));
  return bookmark.join('');
}
function getBookmarkIdFromElement(bookmark) {
  return $(bookmark)
    .closest('.bookmark')
    .data('bookmark-id');
}
function Dropdown() {
  let filter = store.filter;
  let options = '';
  const selections = [
    { value: 0, selected: 'Filter by', },
    { value: 5, selected: '5 Stars', },
    { value: 4, selected: '4+ Stars', },
    { value: 3, selected: '3+ Stars', },
    { value: 2, selected: '2+ Stars', },
    // { value: 1, selected: '1 Star', }
  ];

  for (let i = 0; i <= selections.length - 1; i++) {
    if (filter !== selections[i].value) {
      options += `
      <option value="${selections[i].value}">${selections[i].selected}</option>`;
    } else {
      options += `
      <option value="${selections[i].value}" selected>${selections[i].selected}</option>`;
    }
  }
  return options;
}

function renderRatingSelector(bookmark) {
  let rating = bookmark.rating;
  let nstars = '';
  for (let i = 1; i <= 5; i++) {
    if (i !== parseInt(rating)) {
      nstars += `
        <span>
          <input type="radio" class="star" name="rating" id="str${i}" value="${i}" required>
          <label for="str${i}"></label>
        </span>`;
    } else {
      nstars += `
          <span>
          <input class="checked" type="radio" name="rating" id="str${rating}" value="${rating}" checked required>
          <label for="str${rating}"></label>
        </span>`;
    }
  }
  return nstars;
}
function renderRating(bookmark) {
  let rating = bookmark.rating;
  let opposite = 5 - bookmark.rating;
  let cStars = '';
  let uStars = '';
  for (let i = 1; i <= rating; i++) {
    cStars += '<span class="fa fa-star checked"></span>';
  }
  for (let i = 1; i <= opposite; i++) {
    uStars += '<span class="fa fa-star"></span>';
  }
  return cStars + uStars;
}

function render() {
  errors.renderError();
  let bookmarks = [...store.bookmarks];
  bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  if (store.adding === true) {
    $('main').html(pages.renderAdding());
  } else if (store.editing.editing === true) {
    $('main').html(pages.renderEdit());
  } else {
    $('main').html(pages.renderStartDiv(bookmarks));
  }
}



export default {
  render,
  getBookmarkIdFromElement,
  Dropdown,
  renderEntireApp,
  renderRatingSelector
};
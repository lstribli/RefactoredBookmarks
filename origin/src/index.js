import $ from 'jquery';
import api from '../api';
import bookmarksApp from '../../src/App';
import store from './store';
import events from '../../src/events';
import App from '../../src/App';
import './index.css';

function main() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarksApp.render();
    });

  events.bindEventListeners();
  App.render();
}

$(main);
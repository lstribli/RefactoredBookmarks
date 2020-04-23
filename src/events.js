import $ from 'jquery';
import api from '../../api';
import App from './App';
import store from './store';
import errors from '../../errors';

function AddNew() {
  $('body').on('click', '#addNew', event => {
    event.preventDefault();
    store.adding = true;
    App.render();
  });
}

function Filter() {
  $('body').on('change', '#filter', event => {
    event.preventDefault();
    store.filter = $('#filter').val();
    App.render();
  });
}

function Compress() {
  $('body').on('click', '#compress', event => {
    event.preventDefault();
    store.expanded = '';
    App.render();
  });
}

function Expand() {
  $('body').on('click', '#expand', event => {
    event.preventDefault();
    store.expanded = App.getBookmarkIdFromElement(event.currentTarget);
    App.render();
  });
}

function Edit() {
  $('body').on('click', '.edit', event => {
    event.preventDefault();
    store.editing.id = App.getBookmarkIdFromElement(event.currentTarget);
    console.log(store.editing.id);
    store.editing.editing = true;
    App.render();
  });
}

function Delete() {
  $('body').on('click', '.delete', event => {
    event.preventDefault();
    const id = App.getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        App.render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        App.errors.renderError();
      });
  });
}

function AddNewSubmit() {
  $('body').on('submit', '.ADDFORM', event => {
    event.preventDefault();
    const newBookmark = {};
    newBookmark.title = $('.title').val();
    newBookmark.url = $('.url').val();
    newBookmark.desc = $('.desc').val();
    newBookmark.rating = $('input[name="rating"]:checked').val();
    api.createBookmark(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.adding = false;
        App.render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        App.errors.renderError();
      });
  });
  console.log(store.bookmarks);
}

function Update() {
  $('body').on('submit', '.editBookmarkForm', event => {
    event.preventDefault();
    const id = App.getBookmarkIdFromElement(event.currentTarget);
    console.log('UPDATE: getboookmarkId: ID=', id);
    const editedBookmark = {};
    editedBookmark.title = $('.title').val();
    editedBookmark.url = $('.url').val();
    editedBookmark.desc = $('.desc').val();
    editedBookmark.rating = $('input[name="rating"]:checked').val();
    api.updateBookmark(id, editedBookmark)
      .then(() => {
        store.findAndUpdate(id, editedBookmark);
        store.editing.editing = false;
        App.render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        errors.renderError();
      });
  });
}

function Cancel() {
  $('body').on('click', '#cancel', event => {
    event.preventDefault();
    store.adding = false;
    store.editing.editing = false;
    store.editing.id = '';
    App.render();
  });
}


function bindEventListeners() {
  AddNew();
  Filter();
  Expand();
  Compress();
  Edit();
  Delete();
  AddNewSubmit();
  Update();
  Cancel();
}

export default {
  bindEventListeners,
};
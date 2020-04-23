import $ from 'jquery';
import App from './App';
import store from './store';


function renderStartDiv(bookmarks) {
  return `
  <div class="StartDiv">
    <form class="StartForm">
      <input id="addNew" type="button" value="Add New">
      <label for="filter"></label>
      <select name="filter" id="filter">
        ${App.Dropdown()}
      </select>
    </form>
    ${App.renderEntireApp(bookmarks)}
  </div>`;
}


function renderAdding() {
  return `
  <form class = "ADDFORM">
    <label for="url">Add New Bookmark</label>
    <input type="url" class="url" id="url" name="url" placeholder="{YOUR URL HERE}" required>
    <input type="text" class="title" id="title" name="title" placeholder="{Your Title Here}" required>
    <div class="rating">
    <fieldset>
    <ul class="rate-area">
      <input
        type="radio"id="5-star"name="rating"value="5"
      /><label for="5-star" title="Amazing"></label>

      <input
        type="radio"id="4-star"name="rating"value="4"
      /><label for="4-star" title="Good"></label>

      <input
        type="radio" id="3-star" name="rating" value="3"
      /><label for="3-star" title="Average"></label>

      <input
        type="radio" id="2-star" name="rating" value="2"
      /><label for="2-star" title="Not Good"></label>

      <input type="radio" id="1-star" name="rating" value="1"
      /><label for="1-star" title="Bad"></label>
    </ul>
  </fieldset>
    </div>
    <input type="text" class="desc" id="desc" name="desc" placeholder="{Your Description Here}" required>
    <button type="button" class="cancel" id="cancel">Cancel</button>
    <input type="submit" class="add-bookmark" id="add-bookmark" value="Add Bookmark">
  </form>`;
}

function renderEdit() {
  let id = store.editing.id;
  console.log('renderedit:', id);
  return `
  <form class="editBookmarkForm bookmark" data-bookmark-id="${id}">
  <label for="url">Edit Bookmark</label>
  <input type="url" class="url" id="url" name="url" value="${store.findById(id).url}" required>
  <input type="text" name="title" class="title" id="title" value="${store.findById(id).title}" required>
  <ul class="rating">
    ${App.renderRatingSelector(store.findById(id))}
  </ul>
    <input type="text" class="desc" id="desc" name="description" value="${store.findById(id).desc}" required>
  <button type="button" class="cancel" id="cancel">Cancel</button>
  <input type="submit" class="update-bookmark" id="save" value="Save">
</form>`;
}

export default {
  renderStartDiv,
  renderAdding,
  renderEdit
};
import $ from 'jquery';
import store from '../origin/src/store';

function generateError(msg) {
  return `
      <section class="errorContent">
        <button id="cancelError">Cancel</button>
        <div class="errorDiv">${msg}</div>
      </section>
    `;
}
function renderError() {
  if (store.error) {
    const errormsg = generateError(store.error);
    $('.errorDiv').html(errormsg);
  } else {
    $('.errorDiv').empty();
  }
}
function closeError() {
  $('.errorDiv').on('click', '#cancelError', () => {
    store.setError(null);
    renderError();
  });
}

export default {
  generateError,
  renderError,
  closeError
};
import icons from 'url:../../img/icons.svg';
export default class CommonView {
    _parentEl = document.querySelector('.recipe');
    _data;

    render(data) {
        this._data = data;
        this._clear();
        // this._parentEl.insertAdjacentHTML('afterbegin', markUp);
    }

    _clear() {
        this._parentEl.innerHTML = '';
    }

    showSpinner = function() {
        const markUp = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

      this._parentEl.insertAdjacentHTML('afterbegin', markUp);
    }
}
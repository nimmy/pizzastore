import icons from 'url:../../img/icons.svg';
class Pagination {
    _parentElement = document.querySelector('.pagination');

    render(data) {
        this.res = data;
        const markUp = this._generatorMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    addNextPrevClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const ctaClicked = e.target.closest('.btn--inline');
            console.log(ctaClicked);
            const goToPage = +ctaClicked.dataset.goto;
            console.log(goToPage);
            handler(goToPage);
        })
    }

    _generatorMarkup() {
        const currentPage = this.res.defaultPage;
        const numpages = Math.ceil(this.res.result.length / this.res.resultPagePage);
        console.log(this.res.defaultPage, ' -- ', numpages, ' @@@ ', this.res.result, '####', this.res.resultPagePage);

        if (currentPage === 1 && numpages > 1) {
            return `
          <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1 }">
            <span>Page ${currentPage + 1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        if (currentPage === numpages && numpages > 1) {
            return `<button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1 }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1 }</span>
          </button>`;
        }

        if (currentPage < numpages) {
            return  `<button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1 }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1 }</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1 }">
            <span>Page ${currentPage + 1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        return ` `;
    }

}

export default new Pagination();
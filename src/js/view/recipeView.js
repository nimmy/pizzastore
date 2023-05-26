import icons from 'url:../../img/icons.svg';

class RecipeView {
    #parentEl = document.querySelector('.recipe');
    #data;

    render(data) {
        this.#data = data;
        const markUp = this.#generateMarkup();
        this.#clear();
        this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
    }

    update(data) {
        if (!data || (Array.isArray(data) && data.length !== 0)) {
            return console.log('Error to update');
        }

        this.#data = data;
        const newMarkup = this.#generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElement = Array.from(newDom.querySelectorAll('*'));
        const currentElement = Array.from(this.#parentEl.querySelectorAll('*'));
        newElement.forEach((ele, i) => {
            const curEle = currentElement[i];
            if (!ele.isEqualNode(curEle) && ele.firstChild.nodeValue.trim() !== '') {
                curEle.textContent = ele.textContent;
            }

            if (!ele.isEqualNode(curEle)) {
                Array.from(ele.attributes).forEach(attr => curEle.setAttribute(attr.name, attr.value));
            }
        })


    }

    #clear() {
        this.#parentEl.innerHTML = '';
    }

    showSpinner = function() {
        const markUp = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

      this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addUpdateServings(handler) {
        this.#parentEl.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--tiny');
            if (!btn) return ;
            let increase = +btn.dataset.increase;
            if (increase > 0) handler(increase);
        })
    }

    #generateMarkup() {
        return `
            <figure class="recipe__fig">
                <img src="${this.#data.imageUrl}" alt="${this.#data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${this.#data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--increase-servings" data-increase="${this.#data.servings - 1 }">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings" data-increase="${this.#data.servings + 1 }">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
                </div>

                <div class="recipe__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
                <button class="btn--round">
                <svg class="">
                    <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${this.#data.ingredients.map(list => {
                    return `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${list.quantity ? list.quantity : '---'}</div>
                    <div class="recipe__description">
                    <span class="recipe__unit">${list.unit}</span>
                    ${list.description}
                    pasta
                    </div>
                </li>`
                }).join('')}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href="${this.#data.sourceUrl}"
                target="_blank"
                >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </a>
            </div>`;
    }
}

export default new RecipeView();
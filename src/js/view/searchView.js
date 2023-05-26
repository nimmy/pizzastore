import icons from 'url:../../img/icons.svg';
class searchView {
    #parentEl = document.querySelector('.search');
    #searchDisplay = document.querySelector('.results');
    _errorMessage = 'No result found with you query';

    render(data) {
        this.res = data;
        console.log('Render ' ,data, 'this.res ' ,this.res);
        const markUp = this.#generateMarkup();
        this.#clearQuery();
        this.#searchDisplay.insertAdjacentHTML('afterbegin', markUp);
    }

    getQuery() {
        const query =  this.#parentEl.querySelector('.search__field').value;
        this.#clearQuery();
        return query;
    }

    #clearQuery() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addSearchHandler(handler) {
        console.log(this.#parentEl);
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        });
        
        ['click'].forEach(el => addEventListener(el, handler));
    }

    #generateMarkup() {
        // return this.res.map(this._listGenerate).join();
        const id = window.location.hash.slice(1);
        console.log(id);
        if (this.res.length) {
            return this.res.map(list => {
                return `<li class="preview">
                <a class="preview__link" href="#${list.id}">
                  <figure class="preview__fig">
                    <img src="${list.imageUrl}" alt="${list.title}" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${list.title}</h4>
                    <p class="preview__publisher">${list.publisher}</p>
                    <div class="preview__user-generated">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
            }).join(''); 
        } else {
            return `<h2>${this._errorMessage}</h2>`
        }
           
    }

    // _listGenerate() {
    //     return `<li class="preview">
    //     <a class="preview__link preview__link--active" href="#23456">
    //       <figure class="preview__fig">
    //         <img src="src/img/test-1.jpg" alt="Test" />
    //       </figure>
    //       <div class="preview__data">
    //         <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
    //         <p class="preview__publisher">The Pioneer Woman</p>
    //         <div class="preview__user-generated">
    //           <svg>
    //             <use href="src/img/icons.svg#icon-user"></use>
    //           </svg>
    //         </div>
    //       </div>
    //     </a>
    //   </li>`
    // }
}

export default new searchView();
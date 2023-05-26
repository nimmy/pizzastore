import * as modal from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import Pagination from './view/pagination.js';
import pagination from './view/pagination.js';

const controlRecipes = async function(){
  let id = window.location.hash.slice(1);
  
  try {
    recipeView.showSpinner();
    
    
    // controlServices();
    await modal.loadRecipe(id);
    // searchView.render(modal.state.search);
    recipeView.render(modal.state.recipe);
  } catch (error) {
    console.log('Error ', error);
  }
}

const controlSearchResult = async function() {
  // console.log('hello new', searchView.getQuery());
  try {
    const getQueryStr = searchView.getQuery();
    if (!getQueryStr) return;
    await modal.loadSearchResult(getQueryStr);
    // searchView.render(modal.state.search.result);
    searchView.render(modal.getSearchResultPages(modal.state.search.defaultPage));
    Pagination.render(modal.state.search);
    
    // console.log(modal.state.search.result);
  } catch (error) {
    console.log('Error ', error);
  }
}

const controlPagination = function(goToPage) {
  searchView.render(modal.getSearchResultPages(goToPage));
  Pagination.render(modal.state.search);
  console.log('page contoal');
}

const controlServices = function(newServing) {
  modal.updateService(newServing);
  // recipeView.render(modal.state.recipe);
  recipeView.update(modal.state.recipe);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addUpdateServings(controlServices);
  searchView.addSearchHandler(controlSearchResult);
  pagination.addNextPrevClick(controlPagination);
};

init();
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// window.addEventListener('load', controlRecipes);
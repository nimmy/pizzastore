import { API_URL, RESULT_PAR_PAGE} from './config';
import { getJson} from './helper';
export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        resultPagePage: RESULT_PAR_PAGE,
        defaultPage: 2
    },
}

export const loadRecipe = async function(id) {
    try {
        const data = await getJson(`${API_URL}/${id}`);
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            imageUrl: recipe.image_url,
            cookingTime: recipe.cooking_time,
            servings: recipe.servings,
            ingredients: recipe.ingredients
        }
    } catch (error) {
        console.log(error);
    }
}

export const loadSearchResult =async function(query) {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`);
        // console.log(data)
        state.search.result =  data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageUrl: recipe.image_url
            }
        });
        // console.log(state.search.result);
    } catch (error) {
        console.log(error);
    }
}  


export const getSearchResultPages = function(page = state.search.defaultPage) {
    state.search.defaultPage = page;
    let start = (page - 1) * state.search.resultPagePage;
    let end = page * state.search.resultPagePage;
    return state.search.result.slice(start, end);
}

export const updateService = function(newServices) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServices / state.recipe.servings;
        // console.log(ing, 'New ing', newServices, state.recipe.servics);
    });
    state.recipe.servings = newServices;
}
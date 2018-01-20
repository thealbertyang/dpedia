import { combineReducers } from "redux";

import menuReducer from "./menuReducer"
import authReducer from "./authReducer"
import usersReducer from "./usersReducer"
import resourcesReducer from "./resourcesReducer"
import categoriesReducer from "./categoriesReducer"
import expertsReducer from "./expertsReducer"
import searchReducer from "./searchReducer"
import contactFormReducer from "./contactFormReducer"
import tagsReducer from "./tagsReducer"
import articlesReducer from "./articlesReducer"
import reviewsCategoriesReducer from "./reviewsCategoriesReducer"
import reviewsReducer from "./reviewsReducer"
import videosReducer from "./videosReducer"
import msgReducer from "./msgReducer"
import playlistsReducer from "./playlistsReducer"
import pagesReducer from "./pagesReducer"

import { reducer as formReducer} from "redux-form"

export default combineReducers({
	auth: authReducer,
	menu: menuReducer,
	articles: articlesReducer,
	videos: videosReducer,
	search: searchReducer,
	users: usersReducer,
	resources: resourcesReducer,
	reviews: reviewsReducer,
	tags: tagsReducer,
	categories: categoriesReducer,
	reviews_categories: reviewsCategoriesReducer,
	contactForm: contactFormReducer,
	experts: expertsReducer,
	form: formReducer,
	message: msgReducer,
	playlists: playlistsReducer,
	pages: pagesReducer,
});
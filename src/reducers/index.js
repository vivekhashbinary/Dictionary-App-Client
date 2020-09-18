import counterReducer from './counter';
import isLoggedReducer from './isLogged';
import Dictionary from './dictionary.reducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counterReducer,
    isLoggedReducer,
    Dictionary
})

export default allReducers;
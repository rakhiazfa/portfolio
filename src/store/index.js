import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;

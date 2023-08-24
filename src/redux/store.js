import { createStore, applyMiddleware, combineReducers, } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer';
import SearchReducer from './reducers/SearchReducer';
import PayReducer from "./reducers/PayReducer";
import roomManagerReducer from './reducers/roomManagerReducer'
import bookingManagerReducer from './reducers/bookingManagerReducer';




const rootReducer = combineReducers({ authReducer, cartReducer, SearchReducer, PayReducer, roomManagerReducer, bookingManagerReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
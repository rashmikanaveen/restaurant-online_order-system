import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Use named import
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import {registerNewUserReducer,loginUserReducer} from "./reducers/userReducer"

const rootReducer = combineReducers({
  cart: cartReducer,
  registerNewUserReducer : registerNewUserReducer,
  loginUserReducer : loginUserReducer
  // other reducers
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
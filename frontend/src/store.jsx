import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Use named import
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import {registerNewUserReducer,loginUserReducer} from "./reducers/userReducer"
import {placeOrderReducer} from "./reducers/orderReducer"
const rootReducer = combineReducers({
  cart: cartReducer,
  registerNewUserReducer : registerNewUserReducer,
  loginUserReducer : loginUserReducer,
  placeOrderReducer : placeOrderReducer
  
  // other reducers
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
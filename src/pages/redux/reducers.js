import { combineReducers } from "redux";
import tickets from "./slices/ticketsSlice.js";
// import wishlist from "./slices/wishlistSlice.js";

const reducers = combineReducers({
  tickets,
  //wishlist,
});

export default reducers;

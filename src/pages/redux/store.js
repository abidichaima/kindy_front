/*import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { commentsApi } from '../redux/slices/commentsApi';


const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: {persistedReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: () => [thunk],
});

export const persistor = persistStore(store);
*/
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { commentsApi } from '../redux/slices/commentsApi';
import { eventsApi } from '../redux/slices/eventsApi';


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware).concat(eventsApi.middleware),

});

export const persistor = persistStore(store);
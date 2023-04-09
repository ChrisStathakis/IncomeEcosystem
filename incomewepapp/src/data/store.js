import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from "./reducers";

const middlewares = [thunk]

const persistConfig = {
    key: 'authReducer',
    storage: storage,
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares)
)
const persistor = persistStore(store);

export { store, persistor };
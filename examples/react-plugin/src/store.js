import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const globalReducer =  (state = {}, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

const createReducer = (asyncReducers) => {
  return combineReducers({
    globalReducer,
    ...asyncReducers
  });
}

export default function configureStore() {
  const store = createStore(createReducer(), composeWithDevTools(applyMiddleware(thunk)));
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, asyncReducers) {
  asyncReducers.forEach(item => {
    store.asyncReducers[item.name] = item.reducer;
  })

  store.replaceReducer(createReducer(store.asyncReducers));
}
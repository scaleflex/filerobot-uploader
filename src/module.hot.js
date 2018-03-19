import rootReducer from './AirstoreUploaderPlugin/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./AirstoreUploaderPlugin/reducers', () => {
      const nextRootReducer = require('./AirstoreUploaderPlugin/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
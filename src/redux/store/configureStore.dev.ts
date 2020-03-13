import { applyMiddleware, createStore, Store } from 'redux';
import { rootReducer, RootState } from 'redux/reducer/mainReducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const configureStore = (preloadedState: any): Store<RootState, any> => {
  const store: Store<RootState, any> = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, createLogger()),
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (module.hot) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    module.hot.accept("../reducer/mainReducer", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';

// but where to configure the store?
export default function configureStore() {
  createStore(rootReducer, applyMiddleware(thunk));
}

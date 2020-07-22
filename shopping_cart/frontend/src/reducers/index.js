import { combineReducers } from 'redux';
import products from './products';
import users from './users';
import messages from './messages';
import errors from './errors';

export default combineReducers({
    products,
    user: users,
    messages,
    errors
})
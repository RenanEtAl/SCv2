import { createStore, combineReducers } from "redux"
import userReducer from '../reducers/user'
import accReducer from '../reducers/account'

const rootReducer = combineReducers({
    user: userReducer,
    acc: accReducer
})

const store = createStore(rootReducer)

export default store
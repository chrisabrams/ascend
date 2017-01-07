import ApiClient        from 'helpers/ApiClient'
import {browserHistory} from 'react-router'
import createStore      from 'redux/create'

const client = new ApiClient()
const store = createStore(client, browserHistory, (typeof window == 'object') ? window.__data : {})

export default store

export {ApiClient as client}

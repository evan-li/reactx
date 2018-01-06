
'use strict';

import Store from './store'

let store = null;

if(store == null){
    store = new Store();
}

export default store;
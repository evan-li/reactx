import store from './getStore'

/**
 * 合并store
 * @param options {state, mutations, getters, actions, modules}
 */
function combineStore (options){
    store.combineStore(options);
    return store;
}
export default combineStore
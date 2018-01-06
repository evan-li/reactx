import {deepMerge, deepCopy} from './util'

/**
 * 状态树源数据, 外部不可修改, 只可以通过commit方法修改
 * @type object
 * @private
 */
let _state = {};
/**
 * 模块状态树源数据
 * @type {{}}
 * @private
 */
let _modulesState = {};

class Store {
    /**
     * Store的构造方法
     */
    constructor(){
        this.state = {};
        this.mutations = {};
        this.getters = {};
        this.actions = {};
        this.modules = {};

        // todo 插件
    }

    /**
     * 提交状态修改
     * @param type
     * @param payload
     * @param options
     */
    commit(type, payload, options){
        if(type.type){
            options = payload;
            payload = type;
            type = type.type;
        }
        // 参数处理
        let mutation = this.mutations[type]
        if (!mutation) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(("[reactx] unknown mutation type: " + type));
            }
            return
        }
        mutation.forEach((fn) => {
            fn(payload)
        })
    }

    /**
     * 合并store
     * @param options object {state, mutations, getters, actions, modules}
     */
    combineStore(options){
        options = options || {};
        this.combineModules(options.modules || null);
        this.combineState(options.state || null);
        this.combineMutations(options.mutations || null);
        this.combineGetters(options.mutations || null);
        this.combineActions(options.actions || null);
    }

    /**
     * 合并 模块
     * @param modules
     */
    combineModules(modules) {
        if(!modules) return ;
        deepMerge(this.modules, modules);
        // todo 循环所有的模块
        // todo 合并模块中的状态
        // todo 合并模块中的 mutation
        // todo 合并模块中的 getters
        // todo 合并模块中的 actions
    }

    /**
     * 合并 state
     * @param state
     */
    combineState(state) {
        if(!state) return ;
        deepMerge(_state, state);
        this.state = deepCopy(_state)
    }

    /**
     * 合并 mutations
     * @param mutations
     */
    combineMutations(mutations) {
        if(!mutations) return ;
        deepMerge(this.mutations, mutations)
    }

    /**
     * 合并 getters
     * @param getters
     */
    combineGetters(getters) {
        if(!getters) return ;
        deepMerge(this.getters, getters)
    }

    /**
     * 合并 actions
     * @param actions
     */
    combineActions(actions){
        if(!actions) return ;
        deepMerge(this.actions, actions)
    }
}

export default Store;
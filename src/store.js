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

let _mutations = {};
let _actions = {};

/**
 * 状态管理器
 *
 * @see state 状态树, 聚集所有的状态
 * @see getter 从state中派生出的状态
 * @see mutation 状态修改, 修改状态的操作只能在 mutation 中进行, 且不可以是异步的
 * @see action 逻辑操作, 可以调用一系列的 mutation 进行状态修改, 也可以执行异步操作
 * @see module 模块, 模块中可以继续包含子模块
 *
 * @see options {state, getters, mutations, actions, modules} 初始化或合并状态的选项
 *
 * @constructor ()
 *
 * @property state object 根状态
 * @property getters 从state中派生出的状态
 *
 * @method commit(type, payload, options) 提交 mutation
 * @method dispatch(type, payload) 提交 action
 * @method combineStore(options) 合并状态管理器, 选项参见 options, 相当于连续调用了 combineState/combineMutations/combineGetters/combineActions/combineModules
 * @method combineState(state) 合并状态
 * @method combineMutations(mutations) 合并 mutation
 * @method combineGetters(getters) 合并getters
 * @method combineActions(actions) 合并actions
 * @method combineModules(modules) 合并模块, 每个模块所包含的都是一个 options
 */
class Store {
    /**
     * Store的构造方法
     */
    constructor(){
        this.state = {};
        this.getters = {};
        // mutations与actions不开放, modules要不要开放待定
        // this.mutations = {};
        // this.actions = {};
        // this.modules = {};

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
        this.combineState(options.state || null);
        this.combineMutations(options.mutations || null);
        this.combineGetters(options.mutations || null);
        this.combineActions(options.actions || null);
        this.combineModules(options.modules || null);
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
     * 合并 getters
     * @param getters
     */
    combineGetters(getters) {
        if(!getters) return ;
        deepMerge(this.getters, getters)
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
     * 合并 actions
     * @param actions
     */
    combineActions(actions){
        if(!actions) return ;
        deepMerge(this.actions, actions)
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

}

export default Store;
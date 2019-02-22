//Action提交的是mutation，而不是直接变更状态
//Action可以包含任意异步操作

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state){
            state.count++
        }
    },
    actions: {
        increment(context){
            context.commit('increment')
        },
        incrementAsync({commit}){
            setTimeout(() => {
                commit('increment')
            }, 1000);
        }
    }
})
//Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
//因此你可以调用 context.commit 提交一个 mutation

//Action通过store.dispatch方法触发
store.dispatch('increment')

//Actions 支持同样的载荷方式和对象方式进行分发

/**
 * 组合Action
 * actions: {
 *      actionA ({commit}){
 *          return new Promise(resolve, reject) => {
 *              setTimeout(() => {
 *                  commit('someMutation')
 *                  resolve()
 *              }, 1000) 
 *          }         
 *      }
 * }
 */
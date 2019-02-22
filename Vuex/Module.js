//为了避免store对象过大过于臃肿，Vuex允许将store分割成模块module
//每个模块拥有自己的state、mutation、action、getter
//甚至是嵌套子模块——从上至下进行同样方式的分割：
const moduleA = {
    state: {
        count: 0
    },
    //对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
    mutations: {
        increment (state){
            //这里的'state'是模块的局部状态
            state.count++;
        }
    },
    //对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    actions: {
        incrementIfOddOnRootSum({state, commit, rootState}){
            if((state.count + rootState.count) % 2 === 1){
                commit('increment')
            }
        }
    },
    getters: {
        doubleCount(state){
            //这里的'state'是模块的局部状态
            return state.count * 2
        },
        sunWithRootCount(state, getters, rootState){
            return state.count + rootState.count
        }
    }
}
const moduleB = {
    state: {},
    mutation: {},
    actions: {}
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB,
        //如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
        account: {
            namespaced: true,
            //模块内容 module assets
            state: {
                // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
            },
            getters: {
                isAdmin(){
                    //...
                }  //-> getters['account/isAdmin']
            },
            actions: {
                login(){
                    //..
                } // dispatch('account/login')
            },
            mutations: {
                login() {
                    //...
                } // -> commit('account/login')
            },

            //嵌套模块
            modules: {
                myPage: {
                    state: {/**... */},
                    getters: {
                        profile () { ... } // -> getters['account/profile']
                    }
                },
                //进一步嵌套命名空间
                posts: {
                    namespaced: true,
                    state: { /** */},
                    getters: {
                        popular() {
                            //...
                        } //-> getters['account/posts/popular']
                    }
                }
            }
        }
    }
})

store.state.a //-> moduleA的状态
store.state.b //-> moduleB的状态

//你可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
//const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
//Mutation必须是同步函数 ********

const store = new Vuex.Store({
    store: {
        count: 1
    },
    mutations: {
        increment(state, payload){
            state.count += payload.amount
        }
    }
})
store.commit('increment', {
    amount: 10
})

//提交载荷Payload
//你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
//一般来说，payload是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读

/**
 * mutation的另一种提交风格为
 * store.commit({
 *      type: 'increment',
 *      amount: 10
 * })
 */

//mutation需要遵守Vue的响应规则
/*注意事项
1.最好提前在store中初始化好所有所需属性
2.添加新的属性时：
    (1)使用Vue.set(obj, 'newProp', 123)
    (2)以新对象替换老对象如：
        state.obj = { ...state.obj, newProp: 123 }
*/

//使用常量代替Mutation事件类型
//同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

/**
 * mutation-types.js
 * export const SOME_MUTATION = 'SOME_MUTATION'
*/

/**
 * // store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
 */
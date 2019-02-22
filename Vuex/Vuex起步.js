//store实例
//改变store中状态的唯一途径是显式地提交(commit)mutation
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state){
            state.count++
        }
    }
})

store.commit('increment')

console.log(store.state.count) //-> 1


/*
//在Vue组件中获得Vuex状态
//创建一个Counter组件
const Counter = {
    template: `<div>{{count}}</div>`,
    computed: {
        count(){
            return store.state.count;
        }    
    }
}
*/

//Vuex通过store选项，提供了一种机制将状态从跟组建“注入”到每一个子组件
//需要调用Vue.use(Vuex)
const app = new Vue({
    el: '#app',
    store,
    component: { Counter },
    template: `
        <div class="app">
            <counter></counter>
        </div>
    `
})
//在子组件中能通过this.$store访问到
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count(){
            return this.$store.state.count;
        }
    }
}

//mapState辅助函数，解决一个组件获取多个状态时，需要声明计算属性的重复和冗余

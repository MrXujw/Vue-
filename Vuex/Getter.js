//Getter可以认为时store的计算属性,只有他的依赖值发生改变才会被重新定义
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: 'asdad', done: false}
        ]
    },
    getters: { 
        doneTodos: state => {// getter接受state作为其第一个参数
            return state.todos.filter(todo => todo.done);
        },
        doneTodosCount: (state, getters) => {// getter也可以接受其他getter作为第二个参数
            return getters.doneTodos.length;
        },
        getTodoById: (state) => (id) => { //也可以通过getter返回一个函数，来实现给getter传参
            return state.todos.find(todo => todo.id === id)
        }
    }
})

store.getters.doneTodos //-> [{ id: 1, text: '...', done: true }]

store.getters.doneTodosCount // -> 1

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
//getter再通过方法访问时，每次都会进行调用，而不会缓存结果


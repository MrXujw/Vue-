
//定义一个混入对象
var myMixin = {
    create: function(){
        this.hello()
    },
    methods: {
        hello: function(){
            console.log('hello from mixin')
        }
    }
}
//定义一个使用混入对象的组件
var Component = Vue.extend({
    mixins: [myMixin]
})
var component = new Component(); // => "hello from mixin"

//选项合并
//数据对象在内部会进行浅合并（一层属性深度）
//在和组件的数据发生冲突时以组件数据优先
var mixin1 = {
    data: function(){
        return {
            message: 'hello',
            foo: 'abc'
        }
    }
}
new Vue({
    mixins: [mixin1],
    data: function(){
        return {
            message: 'goodbye',
            bar: 'def'
        }
    },
    create: function(){
        console.log(this.$data);
        // => { message: "goodbye", foo: "abc", bra: "def"}
    }
})

//同名钩子函数将混合为一个数组，都将被调用
//混入对象的钩子将在组件自身钩子之前调用
var mixin2 = {
    create: function(){
        console.log('混入对象的钩子被调用')
    }
}
new Vue({
    mixins: [mixin2],
    create: function(){
        console.log('组件钩子被调用')
    }
})
// => "混入对象的钩子被调用"
// => "组件钩子被调用"

//值为对象的选项，例如methods,components和directives,将被混合为同一个对象
//两个对象键名冲突时，取组件的键值对
var mixin3 = {
    methods: {
        foo: function(){
            console.log('foo')
        },
        conflicting: function(){
            console.log('from mixin3')
        }
    }
}
var vm = new Vue({
    mixins: [mixin3],
    methods: {
        bar: function(){
            console.log('bar')
        },
        conflicting: function(){
            console.log('from self')
        }
    }
})
vm.foo(); // => "foo"
vm.bar(); // => "bar"
vm.conflicting(); // => "from self"
//Vue.extend()也使用同样的策略进行合并

//使用全局混入对象，将会影响到所有之后创建的Vue实例

//为自定义的选项'myOption'注入一个处理器
Vue.mixin4({
    created: function(){
        var myOption = this.$options.myOption
        if(myOption){
            console.log(myOption)
        }
    }
})
new Vue({
    myOption: 'hello!'
})
// => "hello!"

//自定义选项合并策略 --默认策略，即简单地覆盖已有值
Vue.config.optionMergeStrategies.myOption = function(toVal, fromVal){
    //return mergedVal;
}
var strategies = Vue.config.optionMergeStrategies;
strategies.myOption = strategies.methods;

//Vuex 1.x得混入策略
const merge = Vue.config.optionMergeStrategies.computed;
Vue.config.optionMergeStrategies.vuex = function(toVal, fromVal){
    if(!toVal) return fromVal
    if(!fromVal) return toVal
    return {
        getters: merge(toVal.getters, fromVal.getters),
        state: merge(toVal.state, fromVal.state),
        actions: merge(toVal.actions, fromVal.actions)
    }
}
//页面刷新时，自动聚焦输入框

//自定义一个全局自定义指令'v-focus'
Vue.directive('focus', {
    //当被绑定得元素插入到DOM中时
    inserted: function(el){
        //聚焦元素
        el.focus()
    }
})
//局部指令，组件中也接受一个directives得选项
Vue.component('demo', {
    directive: {
        focus: {
            inserted: function(el){
                el.focus()
            }
        }
    }
})

//然后可以在模板中任何元素上使用新的v-focus属性

//自定义指令的钩子函数
//bind: 只调用一次，指令第一次绑定到元素时调用，可以在这里初始化设置
//inserted: 被绑定元素插入父节点时调用
//update: 所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前
//componentUUpdated: 指令所在组件的VNode及其子VNode全部更新后调用
//unbind: 只调用一次，指令与元素解绑时调用

//钩子函数参数
//el: 指令所绑定的元素，可以用来直接操作DOM
//binding: 一个对象，包含以下对象
//name 指令名，不包括v-前缀
//value 指令的绑定值
//oldValue 指令绑定的前一个值
//expression 字符串形式的指令表达式
//arg 传给指令的参数  如，v-my-directive:foo中，参数为"foo"
//modifiers: 一个包含修饰符的对象 v-my-directive.foo.bar中，修饰符
//对象为{foo: true, bar: true}
//vnode: Vue编译生成的虚拟节点
//oldVnode: 上一个虚拟节点，仅在update和componentUpdated钩子中可用

//eg html <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
Vue.directive('demo', {
    bind: function(el, binding, vnode){
        var s = JSON.stringify
        el.innerHTML = 
            'name: '       + s(binding.name) + '<br>' + 
            'value: '      + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: '   + s(binding.arg) + '<br>' +
            'modifiers: '  + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
    }
})
new Vue({
    el: '#hook-arguments-example',
    data: {
        message: 'hello!'
    }
})


//如果，想在bind和update时触发相同的行为，不关心其他钩子
//可以简写为
Vue.directive('color-swatch', function(el, binding){
    el.style.backgroundColor = binding.value;
})

//对象字面量
//<div v-demo1="{ color: 'white', text: 'hello!' }></div>
Vue.directive('demo1', function(el, binding){
    console.log(binding.value.color) // "white"
    console.log(binding.value.text)  // "hello!"
})
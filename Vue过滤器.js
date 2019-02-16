//过滤器可以用在两个地方： 双花括号插值和v-bind表达式
/*在html中
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在`v-bind`中 -->
<div v-bind:id="rawId | formatId"></div>
*/

//在一个组件的选项中定义本地的过滤器
Vue.component('my-filter', {
    filters: {
        capitalize: function(value){
            if(!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})

//或者在创建Vue实例之前全局定义过滤器
Vue.filter('capitalize', function(value){
    if(!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
new Vue({
    //..
})

//过滤器串联
{{message | filterA | filterB}}
//filterA被定义为接受单个参数的过滤器函数，表达式message的值将作为参数传入A
//然后继续调用单个参数的过滤器函数filterB，将filterA的结果传给B

{{ message | filterA('arg1', arg2) }}
//这里filterA被定义为接收三个参数的过滤器函数，message为第一个参数，'arg1'为第二个
//表达式arg2的值是第三个参数
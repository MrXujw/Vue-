import { mapGetters } from 'vuex'

export default {
    //...
    computed: {
        //使用对象展开运算符将getter混入computed对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            //...
        ])    
        //如果想将一个getter属性另取一个名，使用对象形式
        //mapGetters({doneCount: 'doneTodosCount'})  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    }
}
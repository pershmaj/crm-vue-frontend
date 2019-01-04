<template>
    <div class="home">
        <h1>first vue crm</h1>
        <el-button @click="testSocket">Test socket</el-button>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { http } from '@/api/common'
    import Crud from '@/components/Crud'

    export default {
        name: 'home',
        components: {

        },
        data() {
            return {}
        },
        methods: {
            testSocket(){
                // this.$socket.emit('test_emit', {el: 'he', id: 3})
                // console.log(this.$socket)
                // console.log(this.$socket.connect())
                // this.$socket.emit('added_contact', {el: 'he', id: 3})
                http.post('http://localhost:3000/init/')
            }
        }

    }
</script>

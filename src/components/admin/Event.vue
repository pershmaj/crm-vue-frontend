<template>
    <div id="edu-admin">
        <crud :data="this.$store.getters.events"
              :fields="this.$store.getters.eventsFields"
              :count="this.$store.getters.events.length"
              :form="form"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"
        ></crud>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { http } from '@/api/common'
    import Crud from '@/components/Crud'
    export default {
        name: 'home',
        components: {
            Crud,
        },
        data() {
            return {
                ent: "event",
                form: {},
            }
        },
        created(){
            // this.dataInit()
        },
        methods: {
            handleCreate() {},
            handleUpdate (row, index) {
                this.form = { ...row}
            },
            handleDestroy(row, index) { //destroy action
                this.$socket.emit('delete', {ent: this.ent, data: row._id})
            },
            handleSubmit(status, closeDialog){
                if(status === 0){ //create action
                    this.$socket.emit('add', {ent: this.ent, data: this.form})
                    closeDialog()
                } else if(status === 1){ // update action
                    this.$socket.emit('update', {ent: this.ent, data: this.form})
                    closeDialog()
                }
            },
        }
    }
</script>

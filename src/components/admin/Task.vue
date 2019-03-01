<template>
    <div id="edu-admin">
        <crud :data="this.$store.getters.tasks"
              :fields="this.$store.getters.tasksFields"
              :count="this.$store.getters.tasks.length"
              :form="form"
              v-loading="false"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy"
              @submit="handleSubmit" @close="handleCloseDialog"
        ></crud>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { http } from '@/api/common'
    import Crud from '@/components/Crud'
    export default {
        name: 'Contact',
        components: {
            Crud,
        },
        data() {
            return {
                ent: "task",
                form: {},
            }
        },
        created(){
            this.dataInit()
        },
        methods: {
            handleCloseDialog(){
                this.form={}
            },
            handleCreate() {
            },
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
            dataInit(){

            }
        }
    }
</script>

<style>
    .el-table .cell.el-tooltip {
        max-height: 100px;
    }
</style>

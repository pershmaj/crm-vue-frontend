<template>
    <div id="edu-admin">
        <crud :data="data" :fields="fields" :form="form" v-loading="loading"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"
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
                entity: "/tasks/",
                loading:true,
                data: [],
                form: {},
                fields: {
                    // id: { label: "id", type:"objectid",},
                    //tableHidden   ---   hide in list
                    //cuHidden ---    hide in create/update forms
                    name: { label: "Имя", type: 'string',},
                    message: { label: "Текст", type: 'string',},
                    add_datetime: {label: "Добавлена", type: 'datetime', tableHidden:true, cuHidden: true},
                    end_datetime: {label: "Окончание", type: 'datetime', },
                    status_id: { label: 'Статус', type: 'objectid', options: [], },
                    user_id: { label: 'Добавил', type: 'objectid', options: [], },
                    contact_ids: { label: 'Контакты', type: 'objectid', options: [], multiple:true },
                },
            }
        },
        created(){
            this.dataInit()
        },
        methods: {
            handleCreate() {},
            handleUpdate (row, index) {
                this.form = { ...row}
            },
            handleDestroy(row, index) { //destroy action
                http.delete(this.entity+row.id+'/').then((result) => {if(result.status === 204) this.data.splice(index, 1)})
            },
            handleSubmit(status, closeDialog){
                this.form.add_datetime = new Date()
                if(status === 0){ //create action
                    http.post(this.entity, {...this.form}).then((result) => {
                        if(result.status === 201){ this.dataInit(), closeDialog() }
                    })
                } else if(status === 1){ // delete action
                    http.put(this.entity+this.form.id+'/', {...this.form}).then((result) => {
                        if(result.status === 200){
                            this.dataInit(), closeDialog()
                        }
                    })
                }
            },
            dataInit(){
                http.get(this.entity).then(({data}) =>{
                    this.data = data
                    http.get('/status-tasks/').then(({data}) => {
                        this.fields.status_id.options = []
                        data.forEach((item) => {
                            this.fields.status_id.options.push({label: item.name, value: item.id})
                        })
                    })
                    http.get('/contacts/').then(({data}) => {
                        this.fields.contact_ids.options = []
                        data.forEach((item) => {
                            this.fields.contact_ids.options.push({label: item.name, value: item.id})
                        })
                    })
                    http.get('/users/').then(({data}) => {
                        this.fields.user_id.options = []
                        data.forEach((item) => {
                            this.fields.user_id.options.push({label: item.username, value: item.id})
                        })
                    })
                    this.loading = false
                })
            }
        }
    }
</script>

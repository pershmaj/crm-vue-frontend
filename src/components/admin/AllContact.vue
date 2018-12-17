<template>
    <div id="edu-admin">
        <crud :data="data" :fields="fields" :form="form" v-loading="loading"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"
              @row-dblclick="handleRowDblclick"
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
                entity: "/contacts/",
                data: [],
                form: {},
                loading:true,
                fields: {
                    // id: { label: "id", type:"objectid",},
                    //tableHidden   ---   hide in list
                    //cuHidden ---    hide in create/update forms
                    origin: { label: "Идентификатор контакта", type: 'string'},
                    surname: {label: "Фамилия", type: 'string'},
                    name: { label: "Имя", type: 'string',},
                    patro: {label: "Отчество", type: 'string'},
                    level: {label: "Класс", type: 'integer'},
                    phone: {label: "Телефон", type: 'string', tableHidden:true},
                    email: {label: "Почта", type: 'string', tableHidden:true},
                    vk: {label: "ВК", type: 'string'},
                    birthday: {label: "Дата рождения", type: 'date', tableHidden:true},
                    address: {label: "Адрес", type: 'string', tableHidden:true,},
                    datetime: {label: "Добавлен", type: 'datetime', tableHidden:true,},
                    edu_id: { label: 'Школа', type: 'objectid', options: [], },
                    status_id: { label: 'Статус', type: 'objectid', options: [], },
                    user_id: { label: 'Добавил', type: 'objectid', options: [], },
                    event_ids: { label: 'Мероприятия', type: 'objectid', options: [], multiple:true },
                    type_id: { label: 'Тип добавления', type: 'objectid', options: [], },
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
                this.form.datetime = new Date()
                if(status === 0){//create action
                    this.form.origin = this.getRandom()
                }
                http.post('/contacts/', {...this.form}).then((result) => {
                    if(result.status === 201 || result.status === 200){
                        this.dataInit(), closeDialog()
                    }
                })
                // } else if(status === 1){ // update action
                //     http.put(this.entity+this.form.id+'/', {...this.form}).then((result) => {
                //         if(result.status === 200){
                //             this.dataInit(), closeDialog()
                //         }
                //     })
                // }
            },
            handleRowDblclick(row, index){
                console.log(row, index)
            },
            dataInit(){
                http.get('/contacts/').then(({data}) =>{
                    this.data = data
                    http.get('/types-add/').then(({data}) => {
                        this.fields.type_id.options = []
                        data.forEach((item) => {
                            this.fields.type_id.options.push({label: item.name, value: item.id})
                        })
                    })
                    http.get('/status-contacts/').then(({data}) => {
                        this.fields.status_id.options = []
                        data.forEach((item) => {
                            this.fields.status_id.options.push({label: item.name, value: item.id})
                        })
                    })
                    http.get('/edus/').then(({data}) => {
                        this.fields.edu_id.options = []
                        data.forEach((item) => {
                            this.fields.edu_id.options.push({label: item.name, value: item.id})
                        })
                    })
                    http.get('/events/').then(({data}) => {
                        this.fields.event_ids.options = []
                        data.forEach((item) => {
                            this.fields.event_ids.options.push({label: item.name, value: item.id})
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

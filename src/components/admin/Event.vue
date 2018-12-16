<template>
    <div id="edu-admin">
        <crud :data="data" :fields="fields" :form="form"
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
                entity: "/events/",
                data: [],
                form: {},
                fields: {
                    // id: { label: "id", type:"objectid",},
                    name: { label: "Название", type: 'string',},
                    date: { label: "Дата", type: 'date',},
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
                if(status === 0){ //create action
                    console.log({...this.form})
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
                })
            }
        }
    }
</script>

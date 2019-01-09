<template>
    <div class="work-area">
        <v-layout wrap >
            <v-flex class="task_item" xs12 v-for="(task, index) in tasks" @click="taskClick(index)" :key="index">
                <v-card>
                    <v-card-title>
                        <v-flex xs6>{{task.name}}</v-flex>
                        <v-flex xs6>{{task.status_id}}</v-flex>
                        </v-card-title>
                    <v-card-text>{{task.message}}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "WorkArea",
        asyncComputed:{
            tasks: {
                get() {
                    let tasks = []
                    this.$store.getters.tasks.forEach((item) => {
                        item.user_id.forEach((id) => {
                            if(id === this.$session.get('id')) tasks.push(item)
                        })
                    })
                    return tasks
                },
                default: [],
            }
        },
        methods:{
            taskClick(key) {
                let task = this.tasks[key]
                let contact_ids = task.contact_ids
                if(contact_ids.length>0){
                    let pushed = false
                    contact_ids.forEach((item) => {
                        let contact = this.$store.getters.getContactByOrigin(item)
                        console.log(contact)
                        if(contact!== undefined) {
                            console.log(contact)
                            if(!contact.hasOwnProperty('blocked') || pushed) contact.blocked = {}
                            if(!contact.blocked.hasOwnProperty('task_id')) { //если не заблочен
                                // todo: переписать блокировку на поиск при инициализации
                                console.log(contact.name)
                                contact.blocked = {user_id: this.$session.get('id'), task_id: task._id, datetime: new Date()}
                                this.$socket.emit('update', {ent: 'contact', data: contact})
                                this.$router.push({name: 'contact-admin-detail', params: { contactId: contact_ids[0], taskId: task._id }})
                                pushed = true
                            }
                        }
                    })
                    console.log('contact for work not founded')
                }

            }
        }
    }
</script>

<style scoped>
.task_item {
    margin-top: 10px;
}
</style>
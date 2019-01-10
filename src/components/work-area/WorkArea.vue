<template>
    <div class="work-area">
        <v-layout wrap>
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
        asyncComputed: {
            tasks: {
                get() {
                    let tasks = []
                    this.$store.getters.tasks.forEach((item) => {
                        item.user_id.forEach((id) => {
                            if (id === this.$session.get('id')) tasks.push(item)
                        })
                    })
                    return tasks
                },
                default: [],
            }
        },
        methods: {
            taskClick(key) {
                let task = this.tasks[key]
                let contact_ids = task.contact_ids
                if (contact_ids.length) {
                    loop:
                    for (let i = 0; i < contact_ids.length; i++) {
                        let contact = this.$store.getters.getContactByOrigin(contact_ids[i])
                        if(contact.hasOwnProperty('blocked') && contact.blocked.task_id){
                            continue loop//blocked
                        } else {
                            if(contact.hasOwnProperty('tasks')){//if no tasks => send
                                for(let j=0;j<contact.tasks.length;j++){
                                    if(contact.tasks[j].task_id === task._id){ //if in tasks no this task_id => send
                                        if(contact.tasks[j].done){ //if this contact not done in this task => send
                                            continue loop//done
                                        }
                                    }
                                }
                            }
                            contact.blocked = {user_id: this.$session.get('id'), task_id: task._id, datetime: new Date()}
                            this.$socket.emit('update', {ent: 'contact', data: contact})
                            this.$router.push({name: 'contact-admin-detail', params: { contactId: contact.origin, taskId: task._id }})
                            break
                        }
                    }
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
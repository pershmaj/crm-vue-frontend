const getContactForWork = {
    methods: {
        getContactForWork (task) {
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
                            contact.blocked = {user_id: this.$cookies.get('id'), task_id: task._id, datetime: new Date()}
                            console.log(contact_ids[i])
                            this.$socket.emit('update', {ent: 'contact', data: contact})
                            this.$router.push({name: 'contact-admin-detail', params: { contactId: contact.origin, taskId: task._id }})
                            break
                        }
                    }
            }
        },
        taskIsDone (task){
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
                        }
                        return false
                }
            }
            return true
        }
    }
}

export {getContactForWork}
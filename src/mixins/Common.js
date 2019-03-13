var uniqid = require('uniqid')
import Fields from '@/fields'

const Common = {
    methods: {
        //создает контакт на основе формы
        //Если статус 0, то обновляет существующий
        createContact(form, status=0){
            form.datetime = new Date()
            form.user_id = this.$session.get('id')
            if (status === 0) {//create action
                form.origin = uniqid()
            } else { // занулить, если обновление, иначе дубликат ключей в монго
                form._id = null // todo: check for real
            }
            // переписать "" на null иначе джанга ругаться, ржомба
            for (let prop in form) {
                if (form[prop] === "") {
                    form[prop] = null
                }
            }
            this.$socket.emit('add', {ent: 'contact', data: form})
        },
        //по сущности и id возвращает имя
        IdToName (ent, id) {
            let res = this.$store.state[ent][ent].find((el) => {
                // console.log(el._id === id)
                return el._id === id
            })
            if(res){
                return res.name
            }
            return false
        },
        //По сущности и имени возвращает ID
        NameToId (ent, name) {
            let res = this.$store.state[ent][ent].find((el) => {
                // console.log(el._id === id)
                return el.name === name
            })
            if(res){
                return res._id
            }
            return false
        },
        //возвращает контакта для работы по заданию
        //не возвращает ничего, если нет такого
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
                            this.$socket.emit('update', {ent: 'contact', data: contact})
                            this.$router.push({name: 'contact-admin-detail', params: { contactId: contact.origin, taskId: task._id }})
                            break
                        }
                    }
            }
        },
        //проверяет, выполнено ли задание
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
        },
        getContactListByTask(task) {
            let arr = []
            task.contact_ids.forEach((el) => {
                let m = Fields.fullFilledOriginalContacts.find((contact) => {
                    return contact._id === el
                })
                if(m) arr.push(m)
            })
            return m
        }
    }
}

export {Common}
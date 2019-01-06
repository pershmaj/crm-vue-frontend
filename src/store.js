import Vue from 'vue'
import Vuex from 'vuex'
import Fields from '@/fields'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contact: {
            contact: [],
            fields: {}, // здесь опции и они пересоздаются при каждом добавлении сущ
        },
        edu: {
            edu: [],
            fields: {},
        },
        eduType: {
            eduType: [],
            fields: Fields.eduType, // здесь опций нет, статично
        },
        statusContact: {
            statusContact: [],
            fields: Fields.statusContact,
        },
        statusTask: {
            statusTask: [],
            fields: Fields.statusTask,
        },
        task: {
            task: [],
            fields: {},
        },
        event: {
            event: [],
            fields: Fields.event,
        },
        typeAdd: {
            typeAdd: [],
            fields: Fields.typeAdd
        },
        user: {
            user: [],
            fields: {},
        },
        statusComment: {
            statusComment: [],
            fields: Fields.statusComment
        },
        comment: {
            comment: [],
            fields: {},
        },
        mailTemplate: {
            mailTemplate: [],
            fields: Fields.mailTemplate,
        },
    },
    getters: {
        originalContacts: ({contact}) => {
            // создаем карту
            let set = new Map()
            //переворачиваем массив и закидываем только уникальные контакты последней версии
            contact.contact.reverse().forEach((item) => {
                if (!set.has(item.origin)) {
                    set.set(item.origin, item)
                }
            })
            return Array.from(set.values())
        },
        allContacts: state => state.contact.contact,
        allContactsFields: state => state.contact.fields,
        edus: state => state.edu.edu,
        edusFields: state => state.edu.fields,
        EduTypes: state => state.eduType.eduType,
        EduTypesFields: state => state.eduType.fields,
        statusesTask: state => state.statusTask.statusTask,
        statusesTaskFields: state => state.statusTask.fields,
        statusesContact: state => state.statusContact.statusContact,
        statusesContactFields: state => state.statusContact.fields,
        tasks: state => state.task.task,
        tasksFields: state => state.task.fields,
        events: state => state.event.event,
        eventsFields: state => state.event.fields,
        typeAdds: state => state.typeAdd.typeAdd,
        typeAddsFields: state => state.typeAdd.fields,
        statusesComment: state => state.statusComment.statusComment,
        statusesCommentFields: state => state.statusComment.fields,
        mailTemplates: state => state.mailTemplate.mailTemplate,
        mailTemplatesFields: state => state.mailTemplate.fields,
        getCommentsByOrigin: ({comment}) => {
            return origin => {
                let temp = []
                comment.comment.forEach((item) => {
                    if(item.contact_ids === origin) temp.push(item)
                })
                return temp
            }
        },
        getTaskById: ({task}) => {
            return id => {
                return task.task.find((item) => {
                    return item._id === id
                })
            }
        },
        getContactByOrigin: ({contact}) => {
            return origin => {
                return contact.contact.reverse().find((item) => {
                    return item.origin === origin
                })
            }
        },
        getUserById: ({user}) => {
            return id => {
                return user.user.find((item) => {
                    return item._id === id
                })
            }
        }
    },
    mutations: {
        INIT: (state, data) => {
            state[data.ent][data.ent] = data.data
        },
        ADD: (state, data) => {
            state[data.ent][data.ent].push(data.data)
        },
        DELETE: (state, data) => {
            console.log(data)
            let index = state[data.ent][data.ent].findIndex((item, index) => {
                return item._id === data.data
            })
            state[data.ent][data.ent].splice(index, 1)
        },
        UPDATE: (state, data) => {
            let index = state[data.ent][data.ent].findIndex((item, index) => {
                return item._id === data.data._id
            })
            state[data.ent][data.ent].splice(index, 1, data.data)
        },
        SET_FIELDS: (state, data) => {
            state[data.ent].fields = data.data
        }

    },
    actions: {
        socket_add(context, data) {
            context.commit('ADD', data)
            context.dispatch('updateFields')//обновляем зависимости на полях
        },
        socket_init(context, data) {
            context.commit('INIT', data)
        },
        socket_delete(context, data) {
            context.commit('DELETE', data)
            context.dispatch('updateFields') // todo: оптимизировать обновление полей
        },
        socket_update(context, data) {
            context.commit('UPDATE', data)
            context.dispatch('updateFields')
        },
        updateFields(context, data) {
            for (let ent in Fields) {
                for (let ref in Fields[ent]) {
                    if (Fields[ent][ref].options) {
                        let entity = Fields[ent][ref].ent
                        Fields[ent][ref].options = []
                        this.state[entity][entity].forEach((row) => {
                            if (ref === 'user_id') {
                                Fields[ent][ref].options.push({value: row._id, label: row.username})
                            }
                            else if (ref === 'contact_ids') {
                                Fields[ent][ref].options.push({value: row.origin,
                                    label: row.surname + " " + row.name + " " + row.patro})
                            }
                            else {
                                Fields[ent][ref].options.push({value: row._id, label: row.name})
                            }
                        })
                        context.commit('SET_FIELDS', {ent: ent, data: Fields[ent]})
                    }
                }
            }
        },

    }
})


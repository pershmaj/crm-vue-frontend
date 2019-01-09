<template>
    <v-container grid-list-md text-xs-center fluid id="contact-card">
        <v-layout row wrap>
            <v-flex :key="61" xs8>
                <!--status_id if first fields in use-->
                <v-card v-if="relatedContact.status_id">
                    <!--contact-->
                    <v-card-title
                            class="card-title"
                    >
                        {{relatedContact.status_id.name+": "+relatedContact.status_id.label}}
                        {{relatedContact.datetime.name+": "
                        + datetime}}
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="11">{{relatedContact.surname.name+": "+relatedContact.surname.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="12">{{relatedContact.name.name+": "+relatedContact.name.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="13">{{relatedContact.patro.name +": "+relatedContact.patro.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :key="51">{{relatedContact.edu_id.name+": "+relatedContact.edu_id.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="22">{{relatedContact.level.name+": "+relatedContact.level.label}}
                                    </v-flex>
                                    <v-flex xs8 :key="23">{{relatedContact.birthday.name+": "+relatedContact.birthday.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="31">{{relatedContact.phone.name+": "+relatedContact.phone.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="32">{{relatedContact.email.name+": "+relatedContact.email.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="33">{{relatedContact.vk.name +": "+relatedContact.vk.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :justify-start="true">{{relatedContact.address.name+": "+relatedContact.address.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs6 :key="41">
                                        {{relatedContact.user_id.name+": "+relatedContact.user_id.label}}
                                    </v-flex>
                                    <v-flex xs6 :key="42">{{relatedContact.type_id.name+": "+relatedContact.type_id.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" >
                                <v-card-title> {{relatedContact.event_ids.name}}</v-card-title>
                                <v-card-text> {{relatedContact.event_ids.label}}</v-card-text>
                            </v-card>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex :key="62" xs4>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-card>
                            <!--contact history-->
                            <v-card-title>
                                История контакта
                                <!--todo: скрывание кнопки не реактивно-->
                            </v-card-title>
                            <v-card-text v-show="taskMode && commentExists"><v-btn  @click="endWorkWithContact">Закончить работать с контактом</v-btn></v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="taskMode">
                        <v-card>
                            <!--contact history-->
                            <v-card-text>
                                <el-input v-model="newComment.comments[0].comment" type="textarea"/>
                                <el-select v-model="newComment.comments[0].status_id">
                                    <el-option v-for="(opt, key) in commentStatuses" :key="key" :label="opt.label" :value="opt.value"></el-option>
                                </el-select>
                                <v-btn @click="addComment" >Добавить комментарий</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-for="(comment, index) in comments" :key="index">
                        <v-card>
                            <v-card-title>{{comment.user_id+ " "+ comment.status_id}}</v-card-title>
                            <v-card-text>{{comment.comment}} {{comment.datetime}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //todo: карточка контакта как универсальный блок, на вход принимает origin
    import Fields from '@/fields'
    export default {
        name: "ContactCard",
        data() {
            return {
                listener: {},
                contact: {},
                origin: this.$route.params.contactId,
                relatedContact: {},
                taskMode: false,
                newComment: {
                    task_id: this.$route.params.taskId,
                    done: false,
                    comments:[{
                        user_id: this.$session.get('id'),
                        status_id: "", //fill
                        comment: "", //fill
                        datetime: "",
                    }],

                }
            }
        },
        computed: {
            datetime(){
                let date = new Date(this.relatedContact.datetime.label)
                return date.getDay()+"."+(parseInt(date.getMonth())+1)+"."+date.getFullYear()
            }
        },
        asyncComputed: {
            commentStatuses: {
                get() {
                    let statuses = []
                    this.$store.getters.statusesComment.forEach((item) => {
                        statuses.push({label: item.name, value: item._id})
                    })
                    return statuses
                },
                default: []
            },
            relatedContact: {
                get() {
                    this.contact = this.$store.getters.getContactByOrigin(this.origin)
                    let relatedContact = {}
                    let fields = this.$store.getters.allContactsFields
                    for (let field in fields) { //заполняем структуру
                        relatedContact[field] = {} //обязательная инициализация структуры в поле
                        if (this.contact.hasOwnProperty(field)) { // если поле у контакта, то добавлем, иначе пустое
                            if (fields[field].hasOwnProperty('options')) { // если это ключ с опциями
                                if (fields[field].hasOwnProperty('multiple')) { // если множественное
                                    relatedContact[field].name = fields[field].label
                                    for (let i = 0; i < fields[field].options.length; i++) {
                                        for (let j = 0; j < this.contact[field].length; j++) {
                                            if (fields[field].options[i].value === this.contact[field][j]) {
                                                relatedContact[field].label += " " + fields[field].options[i].label
                                                break
                                            }
                                        }
                                    }
                                } else {
                                    for (let i = 0; i < fields[field].options.length; i++) {
                                        if (fields[field].options[i].value === this.contact[field]) {
                                            relatedContact[field].label = fields[field].options[i].label
                                            relatedContact[field].name = fields[field].label
                                            break
                                        }
                                    }
                                }
                            } else {
                                if(this.contact[field])relatedContact[field].label = this.contact[field]
                                else relatedContact[field].label = ""
                                relatedContact[field].name = fields[field].label
                            }
                        } else {
                            relatedContact[field].label = ""
                            relatedContact[field].name = fields[field].label
                        }
                    }
                    return relatedContact
                },
                default() {
                    let contact = {}
                    for (let field in Fields.contact){
                        contact[field] = {}
                        contact[field].label = Fields.contact[field].label
                        contact[field].name = Fields.contact[field].label
                    }
                    return contact
                },
            },
            comments: {
                get() {
                    // let comments = this.contact.tasks
                    let comments = []
                    if(this.$store.getters.getContactByOrigin(this.origin).hasOwnProperty('tasks')
                        && Array.isArray(this.$store.getters.getContactByOrigin(this.origin).tasks)){
                        this.$store.getters.getContactByOrigin(this.origin).tasks.forEach((task) => {
                            if(task.hasOwnProperty('comments'))
                                task.comments.forEach((comment) => {
                                    comments.push(comment)
                                })
                        })
                    }
                    return comments.sort((a, b) => {
                        return new Date(a.datetime).getTime() < new Date(b.datetime).getTime() ? 1 : -1
                    })
                },
                default: []
            },
            commentExists: {
                get(){
                    let temp = this.contact.tasks.find((item) => {
                        return item.task_id === this.$route.params.taskId
                    })
                    console.log(temp)
                    return temp
                },
                default: false,
            }

        },
        created(){
            if(this.$route.params.taskId) {
                this.taskMode = true
                window.addEventListener('beforeunload', this.removeBlock)
            }

        },
        beforeDestroy(){
            this.removeBlock()
        },
        methods: {
            removeBlock(){
                this.contact.blocked = {}
                this.$socket.emit('update', {ent: 'contact', data: this.contact})
                console.log('block removed')
                window.removeEventListener('beforeunload', this.removeBlock)
            },
            addComment() {
                this.newComment.comments[0].datetime = Date.now()
                if(!this.contact.tasks) { //no tasks at all
                    this.contact.tasks = []
                    this.contact.tasks.push(this.newComment)

                } else if(this.contact.tasks.length>0){
                    let temp = this.contact.tasks.find((task, index) => {
                        if(task.task_id === this.$route.params.taskId){
                            this.contact.tasks[index].comments.push(this.newComment.comments[0])
                            return true
                        }
                    })
                    console.log(temp)
                    if(!temp) {
                        this.contact.tasks.push(this.newComment)
                    }
                }
                this.$socket.emit('update', {ent: 'contact', data: this.contact})
            },
            endWorkWithContact() {
                this.contact.tasks.find((item) => {
                    return item.task_id === this.$route.params.taskId
                }).done = true
                this.$socket.emit('update', {ent: 'contact', data: this.contact})
            }
        }

    }
</script>

<style scoped>
    #contact-card {
        font-size: 20px;
    }
    .card-title {
        border-radius: 10px;
        background-color: #4fa953;
        color: white;
        width: 90%;
        margin: auto;
        position: relative;
        top: -20px;
        /*padding-left: 10px;*/
        box-shadow: 0 0 10px #7d7d7d ;
    }
    .card-el {
        width: 100%;
        margin: 10px;
        padding: 10px;
        border-bottom: #ddd 1px solid;
        /*padding-bottom: 10px;*/
    }
</style>
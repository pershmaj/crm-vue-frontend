<template>
    <v-container grid-list-md text-xs-center fluid id="contact-card">
        <v-layout row wrap justify-center>
            <v-flex v-if="taskMode" class="task-notify" xs10>Задача: {{taskNotify}}</v-flex>
            <v-flex v-if="taskMode" xs2><v-btn @click="gotoNext">Следующий</v-btn></v-flex>
            <v-flex :key="61" xs6>
                <v-card>
                    <!--contact-->
                    <v-card-title class="card-title">
                        {{statusContact}}
                        {{datetime}}
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex class="card-el-item" xs12 :key="11">
                                        <v-flex class="card-el-item_up">{{contact.surname+" " +contact.name+" "+contact.patro}}</v-flex>
                                        <v-flex class="card-el-item_down">ФИО</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :key="51">
                                        <v-flex class="card-el-item_up" xs12>{{edu}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Учебное заведение</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="22">
                                        <v-flex class="card-el-item_up" xs12>{{contact.level}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Класс/Курс</v-flex>
                                    </v-flex>
                                    <v-flex xs8 :key="23">
                                        <v-flex class="card-el-item_up" xs12>{{birthday}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Дата рождения</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="31">
                                        <v-flex class="card-el-item_up" xs12>{{contact.phone}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Номер телефона</v-flex>
                                    </v-flex>
                                    <v-flex xs4 :key="32">
                                        <v-flex class="card-el-item_up" xs12>{{contact.email}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Электронная почта</v-flex>
                                    </v-flex>
                                    <v-flex xs4 :key="33">
                                        <v-flex class="card-el-item_up" xs12>{{contact.vk}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Ссылка на ВК</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :justify-start="true">
                                        <v-flex class="card-el-item_up" xs12>{{contact.address}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Адрес</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs6 :key="41">
                                        <v-flex class="card-el-item_up" xs12>{{user}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Последние правки</v-flex>
                                    </v-flex>
                                    <v-flex xs6 :key="42">
                                        <v-flex class="card-el-item_up" xs12>{{type}}</v-flex>
                                        <v-flex class="card-el-item_down" xs12>Тип добавления</v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el">
                                <v-card-title>Мероприятия</v-card-title>
                                <v-card-text>
                                    <v-layout wrap>
                                        <v-flex v-for="event in events">
                                            <v-flex class="card-el-item_up" xs12>{{event.name}}</v-flex>
                                            <v-flex class="card-el-item_down" xs12>{{event.date}}</v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
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
                            </v-card-title>
                            <v-card-text v-show="taskMode && commentExists">
                                <v-btn @click="endWorkWithContact">
                                    <v-layout wrap>
                                        <v-flex class="end-btn_up" xs12>Закончить работать с контактом</v-flex>
                                        <v-flex class="end-btn_down" xs12>
                                            задача по контакту выполнена, переход к следующему</v-flex>
                                    </v-layout>

                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="taskMode">
                        <v-card>
                            <!--contact history-->
                            <v-card-text>
                                <el-input v-model="newComment.comments[0].comment" type="textarea"/>
                                <el-select v-model="newComment.comments[0].status_id">
                                    <el-option v-for="(opt, key) in commentStatuses" :key="key" :label="opt.label"
                                               :value="opt.value"></el-option>
                                </el-select>
                                <v-btn :disabled="!addCommentCheck"
                                       @click="addComment">Добавить комментарий</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <contact-card-comment v-for="(comment, index) in comments" :key="index" :datetime="comment.datetime"
                                          :comment="comment.comment" :user_id="comment.user_id"
                                          :status_id="comment.status_id" :index="index"
                    >
                    </contact-card-comment>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //todo: карточка контакта как универсальный блок, на вход принимает origin
    import Fields from '@/fields'
    import ContactCardComment from "@/components/work-area/ContactCardComment";
    import datetime from 'node-datetime'
    import {Common} from "@/mixins/Common";

    export default {
        name: "ContactCard",
        mixins: [Common],
        components: {ContactCardComment},
        data() {
            return {
                origin: this.$route.params.contactId,
                relatedContact: {},
                taskMode: false,
                newComment: {
                    task_id: this.$route.params.taskId,
                    done: false,
                    comments: [{
                        user_id: this.$session.get('id'),
                        status_id: "", //fill
                        comment: "", //fill
                        datetime: "",
                    }],
                }
            }
        },
        computed: {
            addCommentCheck() {
                if(this.newComment.comments[0].comment && this.newComment.comments[0].status_id)
                    return true
                else return false
            },
        },
        asyncComputed: {
            birthday: {
                get(){
                    return datetime.create(this.contact.birthday).format('d.m.Y')
                }
            },
            datetime: {
                get(){
                    return datetime.create(this.contact.datetime).format('H:M d.m.y')
                }
            },
            taskNotify:{
                get() {
                    if(this.taskMode) return this.$store.getters.getTaskById(this.$route.params.taskId).message
                }
            },
            contact: {
                get() {
                    return this.$store.getters.getContactByOrigin(this.$route.params.contactId)
                },
                default: {},
            },
            edu: {
                get() {
                    return this.$store.getters.getEduById(this.contact.edu_id).name
                },
                default: {},
            },
            type: {
                get() {
                    return this.$store.getters.getTypeById(this.contact.type_id).name
                },
                default: {},
            },
            user: {
                get() {
                    return this.$store.getters.getUserById(this.contact.user_id).username
                },
                default: {},
            },
            events: {
                get() {
                    let temp = []

                    if (this.contact.event_ids) { //i dk why warn on it
                        for (let i = 0; i < this.contact.event_ids.length; i++) {
                            let event = this.$store.getters.getEventById(this.contact.event_ids[i])
                            temp.push({name: event.name, date: datetime.create(event.date).format('d.m.Y')})
                        }
                    }
                    return temp

                },
                default: {}
            },
            statusContact: {
                get() {
                    return this.$store.getters.getContactStatusById(this.contact.status_id).name
                }
            },
            commentStatuses: {
                get() {
                    let statuses = []
                    this.$store.getters.statusesComment.forEach((item) => {
                        statuses.push({value: item._id, label: item.name})
                    })
                    return statuses
                },
                default: []
            },
            comments: {
                get() {
                    let temp = []
                    if (this.contact.tasks) {
                        this.contact.tasks.forEach((task) => {
                            task.comments.forEach((comment) => {
                                // temp.push({comment, task_id: task.task_id, done: task.done})
                                temp.push(comment)
                            })
                        })
                    }
                    return temp.sort((a, b) => {
                        return new Date(a.datetime).getTime() < new Date(b.datetime).getTime() ? 1 : -1
                    })
                }
            },
            commentExists: {
                get() {
                    if(this.contact.tasks){
                        for(let i=0;i<this.contact.tasks.length;i++) {
                            if(this.contact.tasks[i].task_id === this.$route.params.taskId) {
                                return true
                            }
                        }
                    } return false
                },
            }

        },
        created() {
            if (this.$route.params.taskId) {
                this.taskMode = true
                window.addEventListener('beforeunload', this.removeBlock)
            }
        },
        beforeDestroy() {
            this.removeBlock()
        },
        methods: {
            removeBlock() {
                this.contact.blocked = {}
                this.$socket.emit('update', {ent: 'contact', data: this.contact})
                console.log('block removed')
                window.removeEventListener('beforeunload', this.removeBlock)
            },
            endWorkWithContact() {
                for(let i=0;i<this.contact.tasks.length;i++) {
                    if(this.contact.tasks[i].task_id === this.$route.params.taskId) {
                        this.contact.tasks[i].done = true
                        this.$socket.emit('update', {ent: 'contact', data: this.contact})
                        break
                    }
                }
                this.getContactForWork(this.$store.getters.getTaskById(this.$route.params.taskId))
                this.removeBlock()
            },
            addComment() {
                this.newComment.comments[0].datetime = Date.now()
                if (!this.contact.hasOwnProperty('tasks')) {
                    this.contact.tasks = [this.newComment]
                } else if (this.contact.hasOwnProperty('tasks')) {
                    let pushed = false
                    this.contact.tasks.forEach((task, index) => {
                        if (task.task_id === this.$route.params.taskId) {
                            //here add new comment to exists comment array
                            this.contact.tasks[index].comments.push(this.newComment.comments[0])
                            pushed = true
                        }
                    })
                    if (!pushed) {
                        this.contact.tasks.push(this.newComment)
                    }
                }
                this.$socket.emit('update', {ent: 'contact', data: this.contact})
            },
            gotoNext(){
                this.getContactForWork(this.$store.getters.getTaskById(this.$route.params.taskId))
                this.removeBlock()
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
        box-shadow: 0 0 10px #7d7d7d;
    }

    .card-el {
        width: 100%;
        margin: 7px;
        padding: 10px;
        /*border-bottom: #ddd 1px solid;*/
        /*padding-bottom: 10px;*/
    }

    .card-el-item_down{
        color:grey;
        font-size: 70%;
        border-top: #ffecec 1px solid;
    }
    .task-notify {
        margin-bottom: 30px;
    }
    .end-btn_down {
        font-size:50%;
        padding-top: 0;
        position: relative;
        top: -3px;
    }
    .end-btn_up {
        position: relative;
        top:7px;
    }
</style>
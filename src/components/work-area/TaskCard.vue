<template>
    <v-flex xs6 >
        <v-card class="not-done">
            <v-card-title>
                <v-flex xs6>{{task.name}}</v-flex>
                <v-flex xs4>{{status}}</v-flex>
            </v-card-title>
            <v-card-text>
                <v-layout>
                    <v-flex xs8>{{task.message}}</v-flex>
                    <v-flex xs3>
                        <v-btn class="btn" ><v-flex @click="taskClicked">Приступить</v-flex></v-btn>
                        <v-btn class="btn" ><v-flex @click="showContactList">Список</v-flex></v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>

    </v-flex>
</template>

<script>
    import {IdToName} from "../../mixins/IdToName";
    import {getContactForWork} from '@/mixins/WorkArea';

    export default {
        name: "TaskCard",
        props: ['task', 'index'],
        mixins: [IdToName, getContactForWork],
        computed: {
            status(){
                return this.IdToName('statusTask', this.task.status_id)
            },
        },
        methods: {
            taskClicked() {
                this.$emit('taskClicked', this.index)
            },
            showContactList() {
                this.$router.push({name: 'task-contacts-list', params: { taskId: this.task._id, task: this.task }})
            }
        }
    }
</script>

<style scoped>
    .done {
        background-color: green;
    }
    .not-done{
        background-color: #ffffae;
    }
    .start {
        background-color: chartreuse;
    }
    .list {

    }
</style>
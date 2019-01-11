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
    import {getContactForWork} from '@/mixins/WorkArea'

    export default {
        name: "WorkArea",
        mixins: [getContactForWork],
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
                this.getContactForWork(task) //mixin
            }
        }
    }
</script>

<style scoped>
    .task_item {
        margin-top: 10px;
    }
</style>
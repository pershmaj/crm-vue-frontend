<template>
    <div class="work-area">
        <v-layout wrap>
            <v-flex class="task_item" xs12 v-for="(task, index) in tasks" >
                <task-card @taskClicked="taskClick" :index="index" :task="task"></task-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {getContactForWork} from '@/mixins/WorkArea'
    import {IdToName} from "../../mixins/IdToName";
    import TaskCard from "./TaskCard";
    import NameToId from "../../mixins/NameToID"

    export default {
        name: "WorkArea",
        components: {TaskCard},
        mixins: [getContactForWork, IdToName, NameToId],
        asyncComputed: {
            tasks: {
                get() {
                    let tasks = []

                    this.$store.getters.tasks.forEach((item) => {
                        if(this.taskIsDone(item)) {
                            item.status_id = this.IdToName('statusTask', 'Выполнена')
                            return
                        }
                        item.user_id.forEach((id) => {
                            if (id === this.$cookies.get('id')) tasks.push(item)
                        })
                    })
                    return tasks
                },
                default: [],
            }
        },
        methods: {
            taskClick(index) {
                console.log(index)
                let task = this.tasks[index]
                this.getContactForWork(task) //mixin
            }
        }
    }
</script>

<style scoped>
    .work-area {
        font-size: 20px;
    }

    .task_item {
        margin-top: 10px;
    }
</style>
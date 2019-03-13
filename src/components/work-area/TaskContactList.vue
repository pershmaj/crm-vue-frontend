<template>
    <div id="task-contact-list">
        <contact-filter-search-table :data="contactList" @contactPicked="contactPicked" ></contact-filter-search-table>
    </div>
</template>

<script>

    import ContactFilterSearchTable from '../tables/ContactFilterSearchTable.vue';
    import Fields from '@/fields'
    import {Common} from '@/mixins/Common'

    export default {
        name: "TaskContactList",
        mixins: [Common],
        components: {ContactFilterSearchTable},
        data () {
            return {
                task: this.$route.params.task,
            }
        },
        asyncComputed: {
            contactList: {
                get() {

                    return getContactListByTask(this.task)
                },
                default: []
            }
        },
        methods: {
            contactPicked(contact) {
                let task = this.task
                contact.blocked = {user_id: this.$cookies.get('id'), task_id: task._id, datetime: new Date()}
                this.$socket.emit('update', {ent: 'contact', data: contact})
                this.$router.push({name: 'contact-admin-detail', params: { contactId: contact.origin, taskId: task._id }})
            },
        }
    }
</script>

<style scoped>
    .item {
        display: flex;
        height: 40px;
        width:400px;
        padding: 10px;
        margin: 20px;
        background-color: #d3d3d3;
    }
</style>
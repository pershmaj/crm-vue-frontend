<template>
    <div>
        <vue-bootstrap4-table :rows="data" :columns="columns" :config="config" @rowClick="rowClick">
        
        <template slot="button" slot-scope="props">
            <el-button @click="rowClick(props)">Перейти</el-button>
        </template>
        
        </vue-bootstrap4-table>
    </div>
</template>

<script>

    import Fields from '@/fields'
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: "contact-filter-search-table",
        components: {VueBootstrap4Table},
        props: ['data'],
        methods: {
            toggle: function(todo) {
                todo.done = !todo.done
            },
            rowClick({row}) {
                this.$emit('contactPicked', row)
            }
        },
        
        data() {
            return {
                columns: [
                    {
                        lable:"button",
                        name: "button",
                    },
                    {
                        label: "surname",
                        name: "surname",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        },
                        sort: true
                    },
                    {
                        label: "name",
                        name: "name",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                    {
                        label: "patro",
                        name: "patro",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                    {
                        label: "edu_id",
                        name: "edu_id.label",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                    {
                        label: "event_id",
                        name: "event_ids",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                    {
                        label: "birthday",
                        name: "birthday",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                    {
                        label: "datetime",
                        name: "datetime",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        }
                    },
                ],
                config: {
                    pagination: true,
                    num_of_visible_page: 7,
                    per_page: 10,
                    // checkbox_rows: true
                }
            }
        },

    }
</script>


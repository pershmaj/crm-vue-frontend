<template>
    <div id="edu-admin">

        <crud :data="data"
              :fields="this.$store.getters.allContactsFields"
              :count="count"
              :form="form" v-loading="false"
              @search="handleSearch" @submit="handleSubmit" @removeBlock="handleRemoveBlock"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy"

              @row-dblclick="handleRowDblclick"
              @sizePerPageChanged="handlerSizePerPageChanged"
              @currentPageChanged="handlerCurrentPageChanged"
        ></crud>
    </div>
</template>

<script>
    import Crud from '@/components/Crud'
    import {CreateContact} from "@/mixins/CreateContact";


    export default {
        name: 'Contact',
        mixins: [CreateContact],
        components: {
            Crud,
        },
        asyncComputed: {
            data: {
                get() {
                    if (!this.search) {
                        this.count = this.$store.getters.originalContacts.length
                        return this.$store.getters.originalContacts.slice((this.page - 1)
                            * this.pageSize, (this.page) * this.pageSize)
                    } else {
                        this.page = 1
                        return this.$search(this.search, this.$store.getters.originalContacts,
                            this.fuseOptions).then((val) => {
                            this.count = val.length
                            return val.slice((this.page - 1)
                                * this.pageSize, (this.page) * this.pageSize)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                },
                default: []
            }
        },
        data() {
            return {
                ent: "contact",
                pageSize: 10,
                page: 1,
                count: 1,
                form: {},
                loading: true,
                search: "",
                fuseOptions: {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: ['surname', 'name', 'patro']
                }
            }
        },
        created() {
            this.dataInit()
        },
        methods: {
            handleRemoveBlock(row) {
                row.blocked = {}
                console.log(row)
                this.$socket.emit('update', {ent: 'contact', data: row})
            },
            handleCreate() {
            },
            handleSearch(str) {
                this.search = str
            },
            handleUpdate(row, index) {
                this.form = {...row}
            },
            handleDestroy(row, index) { //destroy action
                this.$socket.emit('delete', {ent: this.ent, data: row._id})
            },
            handleSubmit(status, closeDialog) {
                this.createContact(this.form, status)
                closeDialog()
            },
            handleRowDblclick(row, index) {
                // this.form = {...row}
                console.log(row, index)
                this.$router.push({name: 'contact-admin-detail', params: { contactId: row.origin }})
            },
            getRandom() {
                var n = Math.floor(Math.random() * 11)
                var k = Math.floor(Math.random() * 1000000)
                return String.fromCharCode(n) + k
            },
            dataInit() {

            },
            handlerCurrentPageChanged(page) {
                this.page = page
                this.dataInit()
            },
            handlerSizePerPageChanged(size) {
                this.pageSize = size
                this.dataInit()
            },
        }
    }
</script>
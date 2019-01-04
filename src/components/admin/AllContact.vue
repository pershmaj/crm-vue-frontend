<template>
    <div id="edu-admin">

        <crud :data="data"
              :fields="this.$store.getters.allContactsFields"
              :count="count"
              :form="form" v-loading="false"
              @search="handleSearch"
              @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"
              @row-dblclick="handleRowDblclick"
              @sizePerPageChanged="handlerSizePerPageChanged"
              @currentPageChanged="handlerCurrentPageChanged"
        ></crud>
    </div>
</template>

<script>
    import {http} from '@/api/common'
    import Crud from '@/components/Crud'

    export default {
        name: 'Contact',
        components: {
            Crud,
        },
        asyncComputed: {
            data: {
                get() {
                    if (!this.search) {
                        this.count = this.$store.getters.allContacts.length
                        return this.$store.getters.allContacts.slice((this.page - 1)
                            * this.pageSize, (this.page) * this.pageSize)
                    } else {
                        this.page = 1
                        return this.$search(this.search, this.$store.getters.allContacts,
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
                this.form.datetime = new Date()
                this.form.user_id = this.$session.get('id')
                if (status === 0) {//create action
                    this.form.origin = this.getRandom()
                } else { // занулить, если обновление, иначе дубликат ключей в монго
                    this.form._id = null
                }
                // переписать "" на null иначе джанга ругаться, ржомба
                for (let prop in this.form) {
                    if (this.form[prop] === "") {
                        this.form[prop] = null
                    }
                }
                this.$socket.emit('add', {ent: this.ent, data: this.form})
                closeDialog()
            },
            handleRowDblclick(row, index) {
                this.form = {...row}
                console.log(row, index)
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

<template>
    <el-container id="app" style="height: 100%">
        <el-header style="padding:0">
            <el-menu
                    class="el-menu"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true"
                    v-if="this.$cookies.get('token')"
            >
                <el-menu-item index="/">Домой</el-menu-item>
                <el-submenu index="/admin/" v-if="this.$cookies.get('token')">
                    <template slot="title">Административная часть</template>
                    <el-menu-item index="/admin/contact/">Управление контактами</el-menu-item>
                    <el-menu-item index="/admin/all-contact/">Управление всеми контактами</el-menu-item>
                    <el-menu-item index="/admin/task/">Управление задачами</el-menu-item>
                    <el-menu-item index="/admin/event/">Управление мероприятиями</el-menu-item>
                    <el-menu-item index="/admin/edu/">Управление учебными заведениями</el-menu-item>
                    <el-menu-item index="/admin/edu-type/">Управление типами учебных заведений</el-menu-item>
                    <el-menu-item index="/admin/type-add/">Управление типами добавления</el-menu-item>
                    <el-menu-item index="/admin/status-contact/">Управление статусами контактов</el-menu-item>
                    <el-menu-item index="/admin/status-task/">Управление статусами задач</el-menu-item>
                    <el-menu-item index="/admin/status-comment/">Управление статусами комментариев</el-menu-item>
                    <el-menu-item index="/admin/mail-template/">Управление шаблонами для рассылок</el-menu-item>
                    <el-menu-item index="/admin/import-file/">Импорт из файла</el-menu-item>
                    <el-menu-item index="/admin/export-file/">Экспорт в файл</el-menu-item>
                </el-submenu>
                <el-menu-item index="/sender/">Рассылки</el-menu-item>
                <el-menu-item index="/work-area/">Рабочая область</el-menu-item>
                <el-menu-item index="/logout/">Выйти ({{ username }})</el-menu-item>
            </el-menu>
            <div class="line"></div>
        </el-header>

        <el-container>
            <el-main style="height: 100%">
                <router-view/>
            </el-main>
        </el-container>

        <!--todo: всплывающее окно при добавлении чего-либо-->
    </el-container>
</template>

<script>
    import {http} from "@/api/common";
    import Fields from '@/fields'

    export default {
        name: 'app',
        data() {
            return {
                year: new Date().getFullYear(),
                dataLoaded: false,
            }
        },
        computed: {
            username() {
                return this.$cookies.get('username')
            }
        },
        created() {
            if (this.getAuth()) {
                this.$router.push('/')
            }

        },
        beforeUpdate() {
            console.log('im updated')
            this.getAuth()
        },
        methods: {
            checkLogout() {
                this.$confirm('Точно выйти?', 'Подтверждение', {
                    confirmButtonText: 'Выйти',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/logout/')
                })
            },
            getAuth() {
                if (!this.$cookies.get('token')) {
                    console.log('need login')
                    this.$router.push('/login/')
                    return false
                } else {
                    if(!this.dataLoaded) {
                        this.dataLoaded = true
                        this.loadData()
                    }
                    return true
                }
            },
            loadData() {
                if(this.getAuth()){
                    let loading = this.$loading({
                        lock: true,
                        text: 'Загрузка данных',
                    })
                    let arEnt = ['eduType', 'edu', 'contact', 'statusContact', 'statusTask',
                        'typeAdd', 'task', 'event', 'user', 'comment', 'statusComment', 'mailTemplate', 'type']
                    this.$socket.emit('init', {ent: arEnt, token: this.$cookies.get('token')}) // загружаем данные
                    this.sockets.subscribe('inited', ({result}) => {
                        if(!result) {
                            // token check failed
                            loading.close()
                            this.dataLoaded = false
                            this.$router.push('/login/')
                        } else {
                            // all is good
                            this.$store.dispatch('updateFields').then(() => {
                                console.log(Fields)
                                loading.close()
                            })
                        }
                        this.sockets.unsubscribe('inited')
                    })
                }
            },
        }
    }
</script>

<style>
    #app {
        font-family: 'PT Sans Caption', sans-serif;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
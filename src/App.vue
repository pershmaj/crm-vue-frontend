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
              v-show="this.$session.exists()"
      >
        <el-menu-item index="/">Домой</el-menu-item>
        <el-submenu index="/admin/" v-show="this.$session.get('nasyanika')">
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
        </el-submenu>
        <el-menu-item index="/sender/">Рассылки</el-menu-item>
        <el-menu-item index="/logout/">Выйти ({{ username }}) </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>

    <el-container>
      <el-main style="height: 100%">
        <router-view/>
      </el-main>
    </el-container>


  </el-container>
</template>

<script>
    import {http} from "@/api/common";
    export default {
        name: 'app',
        data() {
            return {
                year: new Date().getFullYear()
            }
        },
        computed: {
            username(){
                return this.$session.get('username')
            }
        },
        created() {
            if(this.getAuth()){
                this.$router.push('/')
            }
            let loading = this.$loading({
                lock: true,
                text: 'Загрузка данных',
                // spinner: 'el-icon-loading',
            })
            let arEnt = ['eduType', 'edu', 'contact',  'statusContact', 'statusTask',
                'typeAdd', 'task', 'event', 'user', 'comment', 'statusComment']
            this.$socket.emit('init', {ent: arEnt}) // загружаем данные
            this.sockets.subscribe('inited', (data) => {
                this.$store.dispatch('updateFields').then(() => loading.close())
                this.sockets.unsubscribe('inited')
            })
        },
        beforeUpdate() {
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
                if (!this.$session.exists()) {
                    console.log('need login')
                    this.$router.push('/login/')
                    return false
                } else if (this.$session.get('token')) {
                    console.log('have token')
                    http.defaults.headers.common['Authorization'] = "Token " + this.$session.get('token')
                    return true
                }
            }
        }
    }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    font-family: 'PT Sans Caption', sans-serif;
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
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
<template>
  <div id="app">
    <el-menu
            class="el-menu"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
        <el-container class="">
            <el-menu-item index="/">Домой</el-menu-item>
            <el-submenu index="/admin/">
                <template slot="title">Административная часть</template>
                <el-menu-item index="/admin/contact/">Управление контактами</el-menu-item>
                <el-menu-item index="/admin/all-contact/">Управление всеми контактами</el-menu-item>
                <el-menu-item index="/admin/task/">Управление задачами</el-menu-item>
                <el-menu-item index="/admin/event/">Управление мероприятиями</el-menu-item>
                <el-menu-item index="/admin/edu/">Управление учебными заведениями</el-menu-item>
                <el-menu-item index="/admin/edu-type/">Управление типами учебных заведений</el-menu-item>
                <el-menu-item index="/admin/type-add/">Управление типами добавления</el-menu-item>
                <el-menu-item index="/admin/status/">Управление статусами</el-menu-item>
                <el-menu-item index="/admin/status-type/">Управление типами статусов</el-menu-item>
            </el-submenu>
            <el-menu-item index="/sender/">Рассылки</el-menu-item>
        </el-container>
    </el-menu>
      <div class="line"></div>
    <el-main>
      <router-view/>
    </el-main>

    <el-footer></el-footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

<template>
    <el-row id="login">
        <el-col :span="8" :offset="8">
            <el-form>
                <h5 style="color:red">{{error}}</h5>
                <el-input type="text" name="username" v-model="username"></el-input>
                <el-input type="password" name="password" v-model="password"></el-input>
                <el-button round class="primary" @click="auth">Войти</el-button>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import {http} from "@/api/common";

    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: "",
                error: "",
            }
        },
        created() {
            window.addEventListener('keyup', (evt) => {
              if(evt.keyCode === 13){this.auth()}
            })
        },
        methods: {
            auth() {
                http.post('/api-token-auth/', {username: this.username, password: this.password}).then(({data}) => {
                    this.$session.set('token', data.token)
                    http.defaults.headers.common['Authorization'] = "Token " + data.token
                    this.$router.push('/')
                }).catch(({error}) => {
                    this.error = "Неверный логин или пароль"
                })
            }
        },
    }
</script>

<style scoped>
    #login {
        /*position: absolute;*/
        margin-top:25%;
    }
</style>
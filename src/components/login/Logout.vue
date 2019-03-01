<template>
    
</template>

<script>
    export default {
        name: "Logout",
        created(){
            this.$cookies.keys().forEach((el) => {
                this.$cookies.remove(el)
            })
            this.$router.push('/login/')
        }
    }
</script>

<style scoped>

</style>
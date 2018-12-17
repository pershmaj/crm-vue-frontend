<template>
    
</template>

<script>
    export default {
        name: "Logout",
        created(){
            this.$session.destroy()
            this.$router.push('/login/')
        }
    }
</script>

<style scoped>

</style>
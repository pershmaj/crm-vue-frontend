<template>
    <div id="task-manager">
        <el-button>Добавить контакт</el-button>
        <el-table
            ref="task-table"
            :data="this.$store.getters.tasks"
            >
            <el-table-column
                label="Name"
                property="name"
                width="120"
                ></el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "TaskManager"
    }
</script>

<style scoped>

</style>
<template>
    <div id="task-manager">
        <el-button>Добавить задачу</el-button>
        <el-table
            ref="task-table"
            :data="this.$store.getters.tasks"
            >
            <el-table-column
                label="Название"
                property="name"
                ></el-table-column>
            <el-table-column
                    label="Комментарий"
                    property="message"
            ></el-table-column>
            <el-table-column
                    label="Дата добавления"
                    property="add_datetime"
            ></el-table-column>
            <el-table-column
                    label="Дата окончания"
                    property="end_datetime"
            ></el-table-column>
            <el-table-column
                    label="Статус"
                    property="status_id"
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
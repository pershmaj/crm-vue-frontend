<template>
    <div id="admin">
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/contact/">Управление контактами</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/task/">Управление задачами</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/edu/">Образовательные учреждения</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/edu-type/">Типы образовательных учреждений</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/event/">Мероприятия</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/type-add/">Типы добавления</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/status/">Статусы</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col>
                <router-link to="/admin/status-type/">Типы статусов</router-link>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    export default {
        name: "Admin"
    }
</script>

<style scoped>

</style>
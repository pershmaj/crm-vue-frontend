<template>
    <v-layout wrap>
        <v-flex xs12>
            <!--<a :href="csv" >text file</a>-->
            <el-button @click="startExport">Вывод</el-button>
            {{csv}}
        </v-flex>
    </v-layout>
</template>

<script>
    import Papa from 'papaparse'

    export default {
        name: "ExportFile",
        data(){
            return {
                csv: 'data:application/octet-stream;charset=utf-8;base64,',
            }
        },
        methods: {
            startExport() {
                this.csv = Papa.unparse(this.$store.getters.originalContacts, {
                    delimiter: ";",
                    newLine: "\n",
                    header:true,
                })

            }
        }
    }
</script>

<style scoped>

</style>
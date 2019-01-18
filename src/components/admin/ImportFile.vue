<template>
    <v-layout wrap>
        <v-flex xs12>
            Выберите сущность для загрузки
            <el-select v-model="ent">
                <el-option v-for="field in fields" :value="field.value" :label="field.label"></el-option>
            </el-select>
            <input v-if="ent" ref="file" @change="fileChanged" type="file">
        </v-flex>
        <v-flex xs12>
            {{fileContent}}
        </v-flex>
    </v-layout>
</template>

<script>
    import Papa from 'papaparse'
    import Fields from '@/fields'

    export default {
        name: "ImportFile",
        data() {
            return {
                ent: "",
                fileContent: ""
            }
        },
        computed:{
            fields() {
                let fields = []
                for(let f in Fields) {
                    fields.push({value: f, label:f})
                }
                return fields
            }
        },
        methods: {
            fileChanged(elem) {
                let fr = new FileReader()
                fr.onload = (file) => {
                    let fileContent = file.target.result
                    console.log(fileContent)
                    this.fileContent = Papa.parse(fileContent, {
                        delimiter: ";",
                        newline: "\n",
                        header: true,
                    }).data
                    // this.parseData(this.fileContent)
                }
                fr.readAsText(elem.target.files[0],)
            },
            parseData(data) {

            }
        }
    }
</script>

<style scoped>

</style>
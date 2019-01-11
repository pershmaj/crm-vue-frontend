<template>
    <v-layout wrap>
        <!--<v-flex xs12>-->
            <!--&lt;!&ndash;action="https://jsonplaceholder.typicode.com/posts/"&ndash;&gt;-->
            <!--<el-upload-->
                    <!--drag-->
                    <!--action=""-->
                    <!--:on-preview="handlePreview"-->
                    <!--:remove="handleRemove"-->
                    <!--:http-request="handleHttpRequest"-->
                    <!--:file-list="fileList"-->
                    <!--&gt;-->
                <!--<i class="el-icon-upload"></i>-->
                <!--<div class="el-upload__text">Перетащите сюда файл <em>или нажмите дял загрузки</em></div>-->
                <!--<div class="el-upload__tip" slot="tip">Только файлы с разрешением CSV</div>-->
            <!--</el-upload>-->
        <!--</v-flex>-->
        <v-flex xs12>
            <input ref="file" @change="fileChanged" type="file">
        </v-flex>
        <v-flex xs12>
            {{fileContent}}
        </v-flex>
    </v-layout>
</template>

<script>
    import Papa from 'papaparse'

    export default {
        name: "ImportFile",
        data() {
            return {
                fileContent: ""
            }
        },
        methods: {
            fileChanged(elem) {
                console.log('changed!', elem.target.files[0])
                let fr = new FileReader()
                fr.onload = (file) => {
                    let fileContent = file.target.result
                    console.log(fileContent)
                     console.log(Papa.parse(fileContent, {
                         delimiter: ";",
                         newline: "\n",
                         header: true,
                     }))
                }
                fr.readAsText(elem.target.files[0], )
            },
            handleHttpRequest() {
                return true
            },
            handleRemove(file, fileList){
                console.log('he', fileList)
            },
            handlePreview(){

            },
        }
    }
</script>

<style scoped>

</style>
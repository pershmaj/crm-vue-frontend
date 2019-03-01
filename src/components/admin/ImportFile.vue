<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-flex xs12>
                Выберите сущность для загрузки
                <el-select v-model="ent">
                    <el-option v-for="field in fields" :value="field.value" :label="field.label"></el-option>
                </el-select>
            </v-flex>
            <v-flex xs12>
                Выберите разделитель для записей
                <el-select v-model="entDelimiter">
                    <el-option default value=";" label=";"></el-option>
                    <el-option value="," label=","></el-option>
                    <el-option value="!" label="!"></el-option>
                </el-select>
            </v-flex>
            <v-flex xs12>
                Выберите разделитель для записей c несколькими значениями
                <el-select v-model="multiDelimiter">
                    <el-option value="," label=","></el-option>
                    <el-option value=";" label=";"></el-option>
                    <el-option value="!" label="!"></el-option>
                </el-select>
            </v-flex>
            <v-flex xs12>
                Выберите кодировку файла (Если кривая, то выбрать другую и перезалить файл)
                <el-select v-model="encoding">
                    <el-option value="CP1251" label="CP1251"></el-option>
                    <el-option value="UTF-8" label="UTF-8"></el-option>
                </el-select>
            </v-flex>
            <v-flex xs12>
                <input v-if="ent && entDelimiter && multiDelimiter" ref="file" @change="fileChanged" type="file">
            </v-flex>
        </v-flex>
        <v-flex xs12><el-button @click="AddToDatabase" >Залить данные</el-button></v-flex>
        <v-flex xs12>
            {{fileContent}}
            {{arNewEnts}}
        </v-flex>
    </v-layout>
</template>

<script>
    import Papa from 'papaparse'
    import Fields from '@/fields'
    import * as JsSearch from 'js-search'
    import {CreateContact} from "@/mixins/CreateContact";

    export default {
        name: "ImportFile",
        mixins: [CreateContact],
        data() {
            return {
                ent: "contact",
                fileContent: "",
                entDelimiter: ";",
                multiDelimiter: ",",//for for multiple fields
                arNewEnts: [],
                currEnt: {},
                encoding: 'CP1251',
            }
        },
        computed:{
            fields() {
                let fields = []
                for(let f in Fields) {
                    fields.push({value: f, label: f})
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
                        delimiter: this.entDelimiter,
                        header: true,
                        encoding: this.encoding,
                    }).data
                    this.parseData(this.fileContent)
                }
                fr.readAsText(elem.target.files[0], this.encoding)
            },
            parseData(data) {
                data.forEach((item) => {
                    this.currEnt = {}
                    for(let field in item){
                        if(Fields[this.ent].hasOwnProperty(field)){
                            let res
                            if(Fields[this.ent][field].hasOwnProperty('multiple')){
                                this.currEnt[field] = []
                                if(item[field].match(this.multiDelimiter)){//
                                    let arItem = item[field].split(this.multiDelimiter)
                                    arItem.forEach((el) => { //item is a name
                                        res = this.findIdByName(Fields[this.ent][field].ent, el)
                                        this.addToCurrEnt(field, res, true)
                                    })
                                } else {
                                    console.log(item[field])
                                    res = this.findIdByName(Fields[this.ent][field].ent, item[field])
                                    this.addToCurrEnt(field, res)
                                }
                            } else if(Fields[this.ent][field].hasOwnProperty('options')){
                                res = this.findIdByName(Fields[this.ent][field].ent, item[field])
                                this.addToCurrEnt(field, res)
                            }
                            else {
                                this.addToCurrEnt(field, item[field])
                            }
                        }
                    }
                    this.arNewEnts.push(this.currEnt)
                })

            },
            findIdByName(ent, data){
                let coll  = this.$store.state[ent][ent]
                for(let item in coll){
                    if(coll[item].name === data){
                        return coll[item]._id
                    }
                }
                return false
            },
            addToCurrEnt(field, res, isArr = false){
                if(res){
                    if(isArr){
                        this.currEnt[field].push(res)
                    } else {
                        this.currEnt[field] = res
                    }
                }
            },
            findDuplicatesContacts(data){
                let search = new JsSearch.Search('surname')
                search.addIndex('surname')
                search.addIndex('name')
                search.addIndex('patro')
                search.addDocuments(this.$store.getters.originalContacts);
                console.log(search.search('Мальцева Александра'))
            },
            AddToDatabase() {
                let loading = this.$loading({
                    lock: true,
                    text: 'Заливаю...',
                })
                if(this.ent === 'contact'){
                    this.arNewEnts.forEach((item) => {
                        this.createContact(item)
                    })
                } else {
                    this.arNewEnts.forEach((item) => {
                        this.$socket.emit('add', {ent: this.ent, data: item})
                    })
                }
                loading.close()
            }
        }
    }
</script>

<style scoped>

</style>
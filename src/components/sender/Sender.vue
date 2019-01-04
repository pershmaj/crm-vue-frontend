<template>
    <div id="sender">
        <el-table v-loading="loading" ref="multipleTable" :data="data" style="width: 100%"
            @select-all="handleSelectAll" @selection-change="handleSelectionChanged"   >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column property="surname" label="Фамилия" ></el-table-column>
            <el-table-column property="name" label="Имя" ></el-table-column>
            <el-table-column property="patro" label="Отчество" ></el-table-column>
            <el-table-column property="phone" label="Телефон" ></el-table-column>
            <el-table-column property="email" label="Email" ></el-table-column>
            <el-table-column property="level" label="Класс" ></el-table-column>
            <el-table-column property="address" label="Адрес" ></el-table-column>
        </el-table>
        <el-row style="margin-top: 20px">
            <el-col :span="2" :offset="9">Email</el-col>
            <el-col :span="4" ><el-button v-show="!this.addressbookId" @click="sendEmail">Добавить адреса</el-button></el-col>
            <el-col :span="4" ><el-button type="danger" v-show="this.addressbookId" @click="startCampaign">Отправить письма</el-button></el-col>
        </el-row>
        <!--<el-row style="margin-top: 20px">-->
            <!--<el-button  @click="sendEmail">Добавить адреса</el-button>-->
            <!--<el-button  @click="startCampaign">Отправить письма</el-button>-->
        <!--</el-row>-->
    </div>
</template>

<script>
    import {http} from "@/api/common";

    export default {
        name: "Sender",
        data() {
            return {
                data: [],
                selection: [],
                forSend: [],
                loading:true,
                addressbookId: "",
                readyForSend: false,
                fields: {
                    surname: {label: "Фамилия", type: 'string'},
                    name: { label: "Имя", type: 'string',},
                    patro: {label: "Отчество", type: 'string'},
                    level: {label: "Класс", type: 'integer'},
                    phone: {label: "Телефон", type: 'string', tableHidden:true},
                    email: {label: "Почта", type: 'string', tableHidden:true},
                    vk: {label: "ВК", type: 'string'},
                }
            }
        },
        created() {
            http.get('/contacts-original/').then(({data}) => {
                this.data = data
                this.loading = false
            })
        },
        methods:{
            handleSelectAll(){},
            handleSelectionChanged(selection) {
                this.selection = selection
            },
            sendEmail(){
                this.forSend = [];
                if(this.selection.length>0){
                    this.selection.forEach(({id, email, name, surname}) => {
                        this.forSend.push({email: email, variables: {
                                name: name + ' ' + surname,
                                // for more variables
                            }
                        })
                    })
                    http.post('/send-emails/', this.forSend).then((result) => {
                        this.addressbookId = result.data
                        console.log(result)
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.$alert('Вы никого не выбрали')
                }
            },
            getAddressboolAviable(){

            },
            startCampaign(){
                http.post('/get-addressbook-aviable/', {addressbookId: this.addressbookId}).then(({data}) => {
                    data = data[0]
                    if(data.status == 0){
                        http.post('/start-campaign/', {emails: this.forSend, addressbookId: this.addressbookId}).then(({he}) => {
                            console.log('good', he)
                        })
                    } else {
                        this.$alert(data.status_explain)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
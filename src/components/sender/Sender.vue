<template>
    <div id="sender">
        <v-stepper v-model="stepper">
            <v-stepper-header>
                <v-stepper-step :complete="stepper > 1" step="1">Выбор контактов</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="stepper > 2" step="2">Выбор типа рассылки</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="stepper > 3" step="3">Подтверждение контактов</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">Выбор шаблона и рассылка</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <contact-picker-table @selectionChanged="handleSelectionChanged"></contact-picker-table>
                    <v-btn @click="checkContacts">Далее</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-layout align-center justify-center row fill-height>
                        <v-flex xs3 :key="11" ><v-btn @click="sendType('Viber')" class="send-type">Viber</v-btn></v-flex>
                        <v-flex xs3 :key="12" ><v-btn @click="sendType('Email')" class="send-type">Email</v-btn></v-flex>
                    </v-layout>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-layout align-center justify-center row column>
                        <v-flex xs12 ><h3>Рассылка будет следующим контактам</h3></v-flex>
                        <v-flex v-if="forSend.length>0" xs12 class="contact-list">
                            <v-flex xs10>
                                <v-layout class="contact-item" row  v-for="item in forSend" justify-space-between>
                                    <v-flex class="contact-field" xs3 :key="11">{{item.surname}}</v-flex>
                                    <v-flex class="contact-field" xs3 :key="12">{{item.name}}</v-flex>
                                    <v-flex class="contact-field" xs3 :key="13">{{item.patro}}</v-flex>
                                    <v-flex class="contact-field" xs3 v-if="type === 'Viber'" :key="14">{{item.phone}}</v-flex>
                                    <v-flex class="contact-field" xs3 v-else :key="14">{{item.email}}</v-flex>
                                </v-layout>
                            </v-flex>
                        </v-flex>
                        <v-flex v-else xs12><h3>У выбранных контактов нет телефона или почты</h3></v-flex>
                    </v-layout>
                    <v-btn v-if="forSend.length>0" @click="stepper=4">Далее</v-btn>
                    <v-btn v-else @click="stepper=1">К выбору контактов</v-btn>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <!--выбор шаблона и рассылка-->
                    <mail-template-picker v-if="type==='Email'" @pickedTemplate="handlePickedTemplate"></mail-template-picker>
                    <v-flex xs12 v-else>Все готово, можно начинать рассылку</v-flex>
                    <v-btn :disabled="type==='Email' && template===''" @click="sendAction">Начать рассылку</v-btn>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>


    </div>
</template>

<script>
    import ContactPickerTable from "@/components/admin/ContactPickerTable";
    import MailTemplatePicker from "@/components/sender/MailTemplatePicker";

    export default {
        name: "Sender",
        components: {MailTemplatePicker, ContactPickerTable},
        data() {
            return {
                stepper: 0,
                selection: [],
                template: "",
                type: "",
                forSend: [],
            }
        },
        created() {

        },
        methods:{
            handleSelectionChanged(selected){
                this.selection = selected
            },
            handlePickedTemplate(selected){
                this.template = selected
            },
            checkContacts(){
                if(this.selection.length>0){
                    this.stepper = 2
                }
            },
            sendType(type){
                this.type = type
                if(type === 'Viber') {
                    this.selection.forEach((item) => {
                        if(item.hasOwnProperty('phone')) this.forSend.push(item)
                    })
                } else {
                    this.selection.forEach((item) => {
                        if(item.hasOwnProperty('email')) this.forSend.push(item)
                    })
                }
                this.stepper = 3
            },
            sendAction(){
                this.$socket.emit('start_send', {emails: this.forSend, template: this.template})
            }
        }
    }
</script>

<style scoped>
    .send-type{
        height:100%;
        margin: 50px;
        padding: 30px;
        font-size: 30px;
    }
    .contact-list{
        max-height: 500px;
        overflow-y: scroll;
        font-size: 17px;
    }
    .contact-item{
        border-bottom: antiquewhite 1px solid;
        margin:5px;
    }
    .contact-field {
        margin:10px;
    }
</style>
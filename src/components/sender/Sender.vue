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
                    <v-btn color="primary" @click="stepper=2">Далее</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <!--выбор типа рассылки-->
                    <v-btn color="primary" @click="stepper=3">Далее</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <!--подтверждение контактов-->
                    <v-btn color="primary" @click="stepper=4">Далее</v-btn>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <!--выбор шаблона и рассылка-->
                    <mail-template-picker @pickedtemplate="handlePickedTemplate"></mail-template-picker>
                    <v-btn color="primary" @click="">Отправить</v-btn>
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
            }
        }
    }
</script>

<style scoped>

</style>
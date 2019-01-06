<template>
    <v-container grid-list-md text-xs-center id="contact-card">
        <v-layout row wrap>
            <v-flex :key="61" xs6>
                <v-card>
                    <!--contact-->
                    <v-card-title
                            class="card-title"
                    >
                        {{relatedContact.status_id.name+": "+relatedContact.status_id.label}}
                        {{relatedContact.datetime.name+": "
                        + datetime}}
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="11">{{relatedContact.surname.name+": "+relatedContact.surname.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="12">{{relatedContact.name.name+": "+relatedContact.name.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="13">{{relatedContact.patro.name +": "+relatedContact.patro.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :key="51">{{relatedContact.edu_id.name+": "+relatedContact.edu_id.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="22">{{relatedContact.level.name+": "+relatedContact.level.label}}
                                    </v-flex>
                                    <v-flex xs8 :key="23">{{relatedContact.birthday.name+": "+relatedContact.birthday.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs4 :key="31">{{relatedContact.phone.name+": "+relatedContact.phone.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="32">{{relatedContact.email.name+": "+relatedContact.email.label}}
                                    </v-flex>
                                    <v-flex xs4 :key="33">{{relatedContact.vk.name +": "+relatedContact.vk.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs12 :justify-start="true">{{relatedContact.address.name+": "+relatedContact.address.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" flat>
                                <v-layout row wrap>
                                    <v-flex xs6 :key="41">
                                        {{relatedContact.user_id.name+": "+relatedContact.user_id.label}}
                                    </v-flex>
                                    <v-flex xs6 :key="42">{{relatedContact.type_id.name+": "+relatedContact.type_id.label}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-card class="card-el" >
                                <v-card-title> {{relatedContact.event_ids.name}}</v-card-title>
                                <v-card-text> {{relatedContact.event_ids.label}}</v-card-text>
                            </v-card>


                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex :key="62" xs6>
                <v-card>
                    <!--contact history-->
                    Contact History
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //todo: карточка контакта как универсальный блок, на вход принимает origin
    export default {
        name: "ContactCard",
        // props: ['contactId'],
        data() {
            return {
                contact: {},
                origin: this.$route.params.contactId,
                relatedContact: {},
            }
        },
        computed: {
            datetime(){
                let date = new Date(this.relatedContact.datetime.label)
                return date.getDay()+"."+(parseInt(date.getMonth())+1)+"."+date.getFullYear()
            }
        },
        created() {
            this.contact = this.$store.getters.getContactByOrigin(this.origin)
            let fields = this.$store.getters.allContactsFields
            for (let field in fields) {
                if (this.contact.hasOwnProperty(field)) {
                    this.relatedContact[field] = {}
                    if (fields[field].hasOwnProperty('options')) {
                        if (fields[field].hasOwnProperty('multiple')) {
                            this.relatedContact[field].name = fields[field].label
                            for (let i = 0; i < fields[field].options.length; i++) {
                                for (let j = 0; j < this.contact[field].length; j++) {
                                    if (fields[field].options[i].value === this.contact[field][j]) {
                                        this.relatedContact[field].label += " " + fields[field].options[i].label
                                        break
                                    }
                                }
                            }
                        } else {
                            for (let i = 0; i < fields[field].options.length; i++) {
                                if (fields[field].options[i].value === this.contact[field]) {
                                    this.relatedContact[field].label = fields[field].options[i].label
                                    this.relatedContact[field].name = fields[field].label
                                    break
                                }
                            }
                        }
                    } else {
                        this.relatedContact[field].label = this.contact[field]
                        this.relatedContact[field].name = fields[field].label
                    }
                }
            }
        },
    }
</script>

<style scoped>
    #contact-card {
        font-size: 20px;
    }

    .card-title {
        border-radius: 10px;
        background-color: #1bab1b;
        color: white;
        width: 80%;
        margin: auto;
        position: relative;
        top: -20px;
        /*padding-left: 10px;*/
    }

    .card-el {
        width: 100%;
        margin: 10px;
        padding: 10px;
        border-bottom: #ddd 1px solid;
        /*padding-bottom: 10px;*/
    }
</style>
<template>
    <div>
        <v-layout>
            <v-flex v-bind:class="{choosen: clicked}"  @click="pickedTemplate(item.template)" xs4 v-for="item in this.$store.getters.mailTemplates">
                <div><v-btn>{{item.name}}</v-btn></div>
                <iframe :srcdoc="item.template"></iframe>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>
    export default {
        name: "MailTemplatePicker",
        methods:{
            pickedTemplate(item){
                // this.clicked = !this.clicked
                this.$emit('pickedTemplate', item)
            }
        },
        data(){
            return {
                clicked: false,
            }
        }
    }
</script>

<style scoped>
    .choosen{
        background-color: antiquewhite;
    }
</style>
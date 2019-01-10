<template>
    <v-flex xs12>
        <v-card>
            <v-card-title class="comment_title">
                <v-layout wrap>
                    <v-flex xs6>{{user}}</v-flex>
                    <v-flex xs6>{{status}}</v-flex>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex class="comment_comment" xs12>{{comment}}</v-flex>
                    <v-flex class="comment_time" xs12>{{_datetime}}</v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
    import datetime from 'node-datetime'

    export default {
        name: "ContactCardComment",
        props: ['comment', 'index', 'user_id', 'status_id', 'datetime'],
        asyncComputed: {
            _datetime: {
                get(){
                    return datetime.create(this.datetime).format('H:M d.m.y')
                }
            },
            user: {
                get() {
                    return this.$store.getters.getUserById(this.user_id).username
                },
                default: {}
            },
            status: {
                get() {
                    return this.$store.getters.getStatusCommentById(this.status_id).name
                }
            }

        }
    }
</script>

<style scoped>
    .comment_title {
        border-bottom: #ffecec 1px solid;
    }
    .comment_time {
        color:grey;
        font-size: 70%;
    }
</style>
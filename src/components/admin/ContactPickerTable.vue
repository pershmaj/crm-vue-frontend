<template>
    <v-card>
        <v-card-title>
            Контакты
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="items"
                :search="search"
                data-app
                :pagination.sync="pagination"
                select-all
                item-key="name"
                class="elevation-1"
        >
            <template slot="headers" slot-scope="props">
                <tr>
                    <th>
                        <v-checkbox
                                :input-value="props.all"
                                @click.native="toggleAll"
                        ></v-checkbox>
                    </th>
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                        <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                        ></v-checkbox>
                    </td>
                    <!--<td class="text-xs-right" v-for="item in props.item">{{ item }}</td>-->
                    <td class="text-xs-center">{{ props.item.surname }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.patro }}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ props.item.phone }}</td>
                    <td class="text-xs-center">{{ props.item.birthday }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card>

</template>

<script>
    // @selectionChanged returns selected contacts as array
    export default {
        name: "ContactPickerTable",
        computed: {
            items() {
                return this.$store.getters.originalContacts
            }
        },
        data() {
            return {
                pagination: {
                    // sortBy: 'name'
                },
                selected: [],
                headers: [
                    {text: 'Фамилия', align: 'center', value: 'surname'},
                    {text: 'Имя', align: 'center', value: 'name'},
                    {text: 'Отчество', align: 'center', value: 'patro'},
                    {text: 'Почта', align: 'center', value: 'email'},
                    {text: 'Телефон', align: 'center', value: 'phone'},
                    {text: 'Дата рождения', align: 'center', value: 'birthday'},
                ],
                search: "",
            }
        },
        created() {
            //следим за именением выбрванных контактов
            this.$watch('selected', (old, ew) => {
                this.$emit('selectionChanged', old)//old?maybe new?
            })
        },
        methods: {
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.$store.getters.originalContacts.slice()
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
        }
    }
</script>

<style scoped>

</style>
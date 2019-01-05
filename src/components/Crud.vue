<template>
    <div class="crud">
        <el-row>
            <el-col :span="4">
                <el-input  v-model="searchStr" @keyup.native="search" clearable placeholder="Поиск"></el-input>
            </el-col>
            <el-col :span="3" :offset="21">
                <div class="crud__ctrl" v-if="actions.includes('create')">
                    <el-button type="primary" @click="create" size="small" icon="el-icon-plus">Create</el-button>
                </div>
            </el-col>
        </el-row>

        <el-table :data="data" stripe :border="border || undefined" :row-style="rowStyle || undefined" :highlight-current-row="highlightCurrentRow"
                  @expand="handleExpand" @row-click="handleRowClick" @row-dblclick="handleRowDblclick">
            <slot name="prepend"></slot>
            <template v-for="(key, index) in Object.keys(columns)">
                <div :key="index" v-if="key in fields && fields[key].tableHidden" style=""></div>
                <el-table-column :key="index" v-else-if="key in fields && fields[key].options
          && fields[key].formatter && typeof fields[key].formatter === 'function'"
                                 :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ fields[key].formatter(scope.row, scope.column, scope.row[key]) }}
                    </template>
                </el-table-column>

                <el-table-column :key="index" v-else-if="key in fields && fields[key].multiple" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-for="entItem in scope.row[key]">
                            {{ (fields[key].options.find(item => item.value === entItem) || '').label }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :key="index" v-else-if="key in fields && fields[key].options && !fields[key].raw" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ (fields[key].options.find(item => item.value === scope.row[key]) || '').label }}
                    </template>
                </el-table-column>
                <el-table-column :key="index" v-else-if="key in fields && fields[key].type === TYPES.date" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row[key] ? scope.row[key].slice(0, 10) : '' }}
                    </template>
                </el-table-column>
                <el-table-column :key="index" v-else-if="key in fields && fields[key].type === TYPES.datetime" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <!--{{ scope.row[key] ? scope.row[key].slice(0, 14) : '' }}-->
                        {{ new Date(scope.row[key]).toString()}}
                    </template>
                </el-table-column>
                <el-table-column :key="index" v-else :label="columns[key]" :min-width="fields[key] ? fields[key].width : labelWidth" :prop="key" show-overflow-tooltip></el-table-column>
            </template>
            <slot></slot>

            <el-table-column v-if="actions.includes('update') || actions.includes('destroy')" label="Действия" width="148" align="center">
                <template slot-scope="scope">
                    <el-button v-if="actions.includes('update')" type="warning" size="small" @click.stop="update(scope.row, scope.$index)">Изменить</el-button>
                    <el-button v-if="actions.includes('destroy')" type="danger" size="small" @click.stop="destroy(scope.row, scope.$index)">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!---------------------------------------DETAIL VIEW---------------------------------------->
        <el-dialog title="Детальное представление" :size="detail.size" :close-on-click-modal="false"
                   :visible="detail.visible" :show-close="false" @open="handleOpen">
            <el-row class="detail-row" v-for="(key, index) in Object.keys(labels)" :key="index" style="">
                <el-col :span="6" :offset="3" v-html="labels[key]"></el-col>
                <el-col :span="6" :offset="3" v-if="key in fields && fields[key].multiple">
                    <div v-for="entItem in form[key]">
                        {{ (fields[key].options.find(item => item.value === entItem) || '').label }}
                    </div>
                </el-col>
                <el-col :span="6" :offset="3" v-else-if="key in fields && fields[key].options">{{ (fields[key].options.find(item => item.value === form[key]) || '').label }}</el-col>
                <el-col :span="6" :offset="3" v-else >{{ form[key] }}</el-col>
            </el-row>
            <div slot="footer">
                <el-button type="close" @click="closeDetail">Закрыть</el-button>
            </div>
        </el-dialog>
        <!--/////////////////////////////////////////////CREATE -----------------------------------UPDATE-->
        <el-dialog :title="dialog.title[dialog.status]" :size="dialog.size" :close-on-click-modal="false"
                   :visible="dialog.visible" :show-close="false" @open="handleOpen">
            <el-form class="crud__form" :class="{'crud__form--inline': inline}" ref="form" :model="form" :rules="computedRules" @keyup.native.13="submit">
                <el-form-item v-for="(key, index) in Object.keys(labels)" :key="index" :label="labels[key]" v-show="!fields[key].cuHidden" :prop="key" :label-width="labelWidth">
                    <slot v-if="fields[key].slot" :name="fields[key].slot"></slot>
                     <!--селектор выбора контактов для создания / обновления задачи-->
                    <div v-else-if="fields[key].multiple && fields[key].ent === 'contact'">
                        <contact-picker-table @selectionChanged="handleContactPickerSelectionChanged" ></contact-picker-table>
                        <!--<el-dialog title="Outer Dialog" :visible.sync="showContactPickerModal" append-to-body >-->
                            <!--<div slot="footer" class="dialog-footer">-->
                                <!--<el-button type="primary" @click="showContactPickerModal = false">Close</el-button>-->
                            <!--</div>-->
                        <!--</el-dialog>-->
                    </div>

                    <el-select :disabled="fields[key].disabled" placeholder="" v-else-if="fields[key].multiple" multiple v-model="form[key]" style="width: 100%;" filterable>
                        <el-option v-for="(o, index) in fields[key].options" :key="index" :label="o.label" :value="o.value"
                                   :disabled="fields[key].unique && repeated(key, o.value, (updatingRow || '')[key])"/>
                    </el-select>
                    <el-select :disabled="fields[key].disabled" placeholder="" v-else-if="fields[key].options" v-model="form[key]" style="width: 100%;" filterable>
                        <el-option v-for="(o, index) in fields[key].options" :key="index" :label="o.label" :value="o.value"
                                   :disabled="fields[key].unique && repeated(key, o.value, (updatingRow || '')[key])"/>
                    </el-select>
                    <el-date-picker :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.date" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" v-model="form[key]"></el-date-picker>
                    <el-date-picker :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.datetime" type="datetime" v-model="form[key]"></el-date-picker>
                    <el-input :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.text"
                              type="textarea" resize="none" @keyup.13.native.stop="doNothing"
                              v-model="form[key]" :maxlength="fields[key].length"></el-input>
                    <el-input :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.integer || fields[key].type === TYPES.float" type="number" v-model.number="form[key]" @change="handleNumberChange(key, $event, fields[key].length)"/>
                    <el-input :disabled="fields[key].disabled" :type="fields[key].protected ? 'password' : 'text'" v-else v-model="form[key]" :maxlength="fields[key].length"/>
                </el-form-item>
                <slot name="addon"></slot>
            </el-form>
            <div slot="footer">
                <el-button type="close" @click="closeDialog">Закрыть</el-button>
                <el-button type="primary" @click="submit" :loading="loading">Отправить</el-button>
            </div>
        </el-dialog>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 25, 50, 100]"
                    :page-size="10"
                    layout="sizes, prev, pager, next"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import TYPES from './fieldType'
    import ContactPickerTable from "@/components/admin/ContactPickerTable";
    export default {
        components: {TestContactPickerTable, ContactPickerTable},
        props: {
            //
            data: { required: true, type: Array },
            // данные в форму
            form: { required: true, type: Object },
            // данные для делатьльного представления
            fields: { required: true, type: Object },
            rules: Object,
            //count of objects
            count: 0,
            table: Object,
            size: { default: 'large', type: String },
            labelWidth: { default: '100px', type: String },
            inline: { default: false, type: Boolean },
            loading: { default: false, type: Boolean },
            actions: { default: () => ['create', 'destroy', 'update'], type: Array },
            highlightCurrentRow: { default: false, type: Boolean },
            rowStyle: Function,
            border: { type: Boolean, default: true },

        },
        data() {
            return {
                showContactPickerModal: false,
                currentPage: 0,
                dialog: {
                    status: 0,
                    visible: false,
                    title: {
                        0: 'Добавить новую запись',
                        1: 'Изменить запись'
                    },
                    size: this.inline ? this.size : 'small'
                },
                detail: {
                    status: 0,
                    visible: false,
                    size: this.inline ? this.size : 'small'
                },
                updatingRow: null,
                contactPickerSelected:[],
                searchStr: "",
                TYPES
            }
        },
        computed: {
            labels() {
                let labels = {}
                let fields = this.fields
                for (let key in fields) {
                    labels[key] = fields[key].label
                }
                return labels
            },
            columns() {
                return this.table || this.labels
            },
            computedRules() {
                if (this.rules) return this.rules
                let rules = {}
                let fields = this.fields
                for (let k in fields) {
                    if (fields[k].rules) {
                        rules[k] = fields[k].rules.concat({ pattern: /^\S.*?$/, message: 'Бля херня какая то' })
                    }
                }
                return rules
            }
        },
        methods: {
            doNothing() {},
            search() {
                //todo: передать в компонент строку и вернуть результат поиска
                this.$emit('search', this.searchStr)
            },
            create() {
                this.dialog.status = 0
                this.showDialog()
                this.$emit('create')
            },
            update(row, index) {
                this.dialog.status = 1
                this.updatingRow = row //todo: сюда поставить список контактов
                this.showDialog()
                console.log(this.updatingRow)
                this.$emit('update', row, index)
            },
            destroy(row, index) {
                this.$confirm(`Удалить?`, 'Подтверждение', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
                }).then(()=> {
                    this.$emit('destroy', row, index)
                }).catch(_ => {})
            },
            showDialog() {
                this.dialog.visible = true
                this.$emit('open')
            },
            closeDialog() {
                this.dialog.visible = false
                this.$emit('close')
            },
            showDetail(){
                console.log('crud show detail')
                this.detail.visible = true
                this.$emit('detailOpen')
            },
            closeDetail(){
                this.detail.visible = false
                this.$emit('detailClose')
            },
            handleOpen() {
                if (this.$refs.form) {
                    this.$refs.form.resetFields()
                }
            },
            submit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$emit('submit', this.dialog.status, this.closeDialog)
                    }
                })
            },
            repeated(key, value, self) {
                if (value === self) return false
                return this.data.find(item => item[key] === value) ? true : false
            },
            handleExpand(row, expanded) {
                this.$emit('expand', row, expanded)
            },
            handleRowClick(row, event, column) {
                this.$emit('row-click', row, event, column)
            },
            handleRowDblclick(row, event) {
                this.showDetail()
                this.$emit('row-dblclick', row, event)
            },
            handleNumberChange(key, event, length) {
                const tooLong = event.toString().length > length
                const slicedText = event.toString().slice(0, length)
                this.$nextTick(() => {
                    this.form[key] = slicedText
                })
            },
            handleSizeChange(size) {
                this.$emit('sizePerPageChanged', size)
            },
            handleCurrentChange(page) {
                this.$emit('currentPageChanged', page)

            },
            handleContactPickerSelectionChanged(selected){
                let temp = []
                selected.forEach(({origin}) => { temp.push(origin) })
                this.form.contact_ids = temp
            }
        }
    }
</script>

<style>
    .detail-row {
        padding-top: 20px;
        font-size: 20px;
        border-bottom: #eaeaea 1px solid;
    }
    .crud__ctrl {
        margin: 8px 0;
    }
    .crud__form--inline:after {
        content: '';
        clear: both;
        display: table;
    }
    .crud__form--inline .el-form-item {
        width: 33%;
        min-height: 38px;
        float: left;
        padding: 0 8px;
        box-sizing: border-box;
    }
</style>
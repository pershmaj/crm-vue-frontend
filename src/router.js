import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from "@/views/Admin";
import Edu from "@/components/admin/Edu";
import EduType from "@/components/admin/EduType";
import Event from "@/components/admin/Event";
import TypeAdd from "@/components/admin/TypeAdd";
import Contact from "@/components/admin/Contact";
import Task from "@/components/admin/Task";
import Sender from "@/components/sender/Sender";
import AllContact from "@/components/admin/AllContact";
import Login from "@/components/login/Login";
import Logout from "@/components/login/Logout";
import StatusContact from "@/components/admin/StatusContact";
import StatusTask from "@/components/admin/StatusTask";
import TaskManager from "@/components/work-area/TaskManager";
import ContactCard from "@/components/work-area/ContactCard";
import StatusComment from "@/components/admin/StatusComment";
import WorkArea from "@/components/work-area/WorkArea";
import MailTemplate from "@/components/admin/MailTemplate";
import ImportFile from "@/components/admin/ImportFile";
import ExportFile from "@/components/admin/ExportFile";
import TaskContactList from "./components/work-area/TaskContactList";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login/', name: 'login', component: Login},
        {path: '/logout/', name: 'logout', component: Logout},
        {path: '/admin/', name: 'admin', component: Admin},
        {path: '/sender/', name: 'sender', component: Sender},


        {path: '/admin/contact/', name: 'contact-admin', component: Contact},
        {path: '/admin/status-comment/', name: 'status-comment-admin', component: StatusComment},
        {path: '/admin/contact/:contactId', name: 'contact-admin-detail', component: ContactCard},
        {path: '/admin/all-contact/', name: 'all-contact-admin', component: AllContact},
        {path: '/admin/task/', name: 'task-admin', component: Task},
        {path: '/admin/edu/', name: 'edu-admin', component: Edu},
        {path: '/admin/status-contact/', name: 'status-contact-admin', component: StatusContact},
        {path: '/admin/edu-type/', name: 'edu-type-admin', component: EduType},
        {path: '/admin/status-task/', name: 'status-task-admin', component: StatusTask},
        {path: '/admin/event/', name: 'event-admin', component: Event},
        {path: '/admin/type-add/', name: 'type-add-admin', component: TypeAdd},
        {path: '/admin/mail-template/', name: 'mail-template-admin', component: MailTemplate},
        {path: '/admin/import-file/', name: 'import-file', component: ImportFile},
        {path: '/admin/export-file/', name: 'export-file', component: ExportFile},


        {path: '/work-area/', name: 'work-area', component: WorkArea},
        {path: '/work-area/:taskId/contacts/', name: 'task-contacts-list', component: TaskContactList}

    ]
})

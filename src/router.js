import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from "@/views/Admin";
import Edu from "@/components/admin/Edu";
import EduType from "@/components/admin/EduType";
import Event from "@/components/admin/Event";
import TypeAdd from "@/components/admin/TypeAdd";
import Status from "@/components/admin/Status";
import StatusType from "@/components/admin/StatusType";
import Contact from "@/components/admin/Contact";
import Task from "@/components/admin/Task";
import Sender from "@/components/sender/Sender";
import AllContact from "@/components/admin/AllContact";
import Login from "@/components/login/Login";
import Logout from "@/components/login/Logout";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login/',
            name: 'login',
            component: Login
        },
        {
            path: '/logout/',
            name: 'logout',
            component: Logout
        },
        {
            path: '/admin/',
            name: 'admin',
            component: Admin
        },
        {
            path: '/sender/',
            name: 'sender',
            component: Sender
        },
        {
            path: '/admin/contact/',
            name: 'contact-admin',
            component: Contact
        },
        {
            path: '/admin/all-contact/',
            name: 'all-contact-admin',
            component: AllContact
        },
        {
            path: '/admin/task/',
            name: 'task-admin',
            component: Task
        },
        {
            path: '/admin/edu/',
            name: 'edu-admin',
            component: Edu
        },
        {
            path: '/admin/status/',
            name: 'status-admin',
            component: Status
        },
        {
            path: '/admin/edu-type/',
            name: 'edu-type-admin',
            component: EduType
        },
        {
            path: '/admin/status-type/',
            name: 'status-type-admin',
            component: StatusType
        },
        {
            path: '/admin/event/',
            name: 'event-admin',
            component: Event
        },
        {
            path: '/admin/type-add/',
            name: 'type-add-admin',
            component: TypeAdd
        },

    ]
})

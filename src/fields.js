var Fields = {
    contact: {
        // _id: { label: "id", type:"objectid",},
        //tableHidden   ---   hide in list
        //cuHidden ---    hide in create/update forms
        origin: { label: "Идентификатор контакта", type: 'string', cuHidden: true,},
        surname: {label: "Фамилия", type: 'string'},
        name: { label: "Имя", type: 'string',},
        patro: {label: "Отчество", type: 'string'},
        level: {label: "Класс", type: 'integer'},
        phone: {label: "Телефон", type: 'string', },
        email: {label: "Почта", type: 'string', },
        vk: {label: "ВК", type: 'string'},
        birthday: {label: "Дата рождения", type: 'date', tableHidden:true},
        address: {label: "Адрес", type: 'string', tableHidden:true,},
        datetime: {label: "Добавлен", type: 'datetime', tableHidden:true, cuHidden: true},
        edu_id: { label: 'Школа', type: 'objectid', options: [], ent: 'edu'},
        status_id: { label: 'Статус', type: 'objectid', options: [], ent: 'statusContact'},
        user_id: { label: 'Добавил', type: 'objectid', options: [], cuHidden: true, ent: 'user'},
        event_ids: { label: 'Мероприятия', type: 'objectid', options: [], multiple:true, ent: 'event' },
        type_id: { label: 'Тип добавления', type: 'objectid', options: [], ent:'typeAdd'},
    },
    edu: {
        // id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'String',},
        type_id: { label: 'Тип', type: 'objectid', options: [], ent: 'eduType' },
    },
    eduType: {
        // _id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'String',},
    },
    statusContact: {
        // _id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'String',},
    },
    statusTask: {
        // _id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'String',},
    },
    event: {
        // id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'string',},
        date: { label: "Дата", type: 'date',},
    },
    typeAdd: {
        // _id: { label: "id", type:"objectid",},
        name: { label: "Название", type: 'String',},
    },
    task: {
        // id: { label: "id", type:"objectid",},
        //tableHidden   ---   hide in list
        //cuHidden ---    hide in create/update forms
        name: { label: "Имя", type: 'string',},
        message: { label: "Текст", type: 'string',},
        add_datetime: {label: "Добавлена", type: 'datetime', tableHidden:true, cuHidden: true},
        end_datetime: {label: "Окончание", type: 'datetime', },
        status_id: { label: 'Статус', type: 'objectid', options: [], ent: 'statusTask'},
        user_id: { label: 'Исполнители', type: 'objectid', options: [], multiple:true, ent: 'user' },
        contact_ids: { label: 'Контакты', type: 'objectid', options: [], multiple:true, ent: 'contact' },
    }


}

export default Fields
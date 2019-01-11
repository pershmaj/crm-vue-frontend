import hash from 'object-hash'

const CreateContact = {
    methods: {
        createContact(form, status=0){
            form.datetime = new Date()
            form.user_id = this.$session.get('id')
            if (status === 0) {//create action
                form.origin = hash(Date.now())
            } else { // занулить, если обновление, иначе дубликат ключей в монго
                form._id = null // todo: check for real
            }
            // переписать "" на null иначе джанга ругаться, ржомба
            for (let prop in form) {
                if (form[prop] === "") {
                    form[prop] = null
                }
            }
            this.$socket.emit('add', {ent: 'contact', data: form})
        },
    }
}

export {CreateContact}
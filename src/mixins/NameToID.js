const NameToId = {
    methods: {
        NameToId (ent, name) {
            let res = this.$store.state[ent][ent].find((el) => {
                // console.log(el._id === id)
                return el.name === name
            })
            if(res){
                return res._id
            }
            return false
        }
    }
}

export default {NameToId}
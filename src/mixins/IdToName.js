const IdToName = {
    methods: {
        IdToName (ent, id) {
            let res = this.$store.state[ent][ent].find((el) => {
                // console.log(el._id === id)
                return el._id === id
            })
            if(res){
                return res.name
            }
            return false
        }
    }
}

export {IdToName}
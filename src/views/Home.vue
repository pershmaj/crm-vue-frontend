<template>
  <div class="home">
    <h1>first vue crm</h1>
    {{fields}}
  </div>
</template>

<script>
    // @ is an alias to /src
    import { http } from '@/api/common'
    import Crud from '@/components/Crud'
    import Fields from '@/fields'
    import {Common} from '@/mixins/Common'

    export default {
        name: 'home',
        mixins: [Common],
        computed: {
          fields() {
            return Fields.contact
          }
        },
        mounted() {
        }
    }
</script>
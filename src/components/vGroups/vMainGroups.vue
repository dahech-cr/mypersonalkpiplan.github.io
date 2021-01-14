<template>
    <div>
        <SearchGroup />
        <GetSheduler />
    </div>
</template>

<script>
import GetSheduler from './vGetSheduler'
import SearchGroup from './vSearchGroup'

export default {
    name:"MainGroup",
    components:{
        GetSheduler , SearchGroup
    }
}
</script>
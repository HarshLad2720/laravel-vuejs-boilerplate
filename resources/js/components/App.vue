<template>
    <v-app id="appMain" class="appMain" light>
    <router-view :key="$route.fullPath"></router-view>
    </v-app>
</template>


<style lang="scss">
    @import "../../assets/plugins/flaticon/flaticon.css";
    @import "../../assets/plugins/flaticon2/flaticon.css";
</style>
<script>
export default {
    name:'',
    data() {
        return {
        }
    },
    created() {
    },
}
</script>




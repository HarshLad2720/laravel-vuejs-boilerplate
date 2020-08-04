<template>
        <v-app id="appMain" class="appMain" light>
            <router-view :key="$route.fullPath"></router-view>
        </v-app>
</template>
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




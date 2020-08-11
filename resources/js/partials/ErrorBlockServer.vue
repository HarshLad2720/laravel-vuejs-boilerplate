<template>
    <div style="color: red;" v-if="errorMessage" v-html="errorMessage"></div>
</template>

<script>
    export default {
        props: [
            "errorMessage",
        ],
    };
</script>

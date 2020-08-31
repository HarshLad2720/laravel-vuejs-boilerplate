<template>
    <v-dialog :value="value" @click:outside="$emit('input')" @keydown.esc="$emit('input')" content-class="modal-dialog">
        <v-card>
            <v-card-title class="headline black-bg" primary-title>{{title}}</v-card-title>
            <v-card-text>
                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                           <!-- <p>{{message}}</p>-->
                            <span v-html="message"></span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                            <v-btn class="btn btn-black m-b-10 m-t-10"  @click.native="$emit('input')">Ok</v-btn>
                        </v-flex>
                    </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "custom-dialog",
        props: ['value','title','message']
    }
</script>

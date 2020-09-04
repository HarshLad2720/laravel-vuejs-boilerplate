<template>
    <v-dialog :value="value" :persistent="loading" @click:outside="onCancel()" @keydown.esc="onCancel()" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{isEditMode ? 'Update' : 'Add'}} Country
            </v-card-title>

            <v-card-text>
                <form method="POST" name="country-form" role="form" novalidate autocomplete="off" @submit.prevent="addAction">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                            <v-text-field
                                label="Country*" type="text"
                                name="role"
                                v-model="model.name"
                                :error-messages="getErrorValue('role')"
                                v-validate="'required'"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="mt-4">
                            <v-btn class="btn btn-primary" type="submit" :loading="loading">
                                {{isEditMode ?  $getConst('BTN_UPDATE') : $getConst('BTN_SUBMIT') }}
                            </v-btn>
                            <v-btn class="btn btn-grey" @click.native="onCancel" :disabled="loading">
                                {{ $getConst('BTN_CANCEL') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script src="./addcountry.js"></script>

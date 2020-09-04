<template>
    <v-dialog :value="value" :persistent="loading" @click:outside="onCancel()" @keydown.esc="onCancel()" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{isEditMode ? 'Update' : 'Add'}} City
            </v-card-title>

            <v-card-text>
                <form method="POST" name="city-form" role="form" novalidate autocomplete="off" @submit.prevent="addAction">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                            <v-text-field
                                label="City*" type="text"
                                name="city"
                                v-model="model.name"
                                :error-messages="getErrorValue('city')"
                                v-validate="'required'"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-autocomplete
                                    v-model="model.state_id"
                                    name="state"
                                    item-text="name"
                                    item-value="id"
                                    :items="setStateList"
                                    :error-messages="getErrorValue('state')"
                                    v-validate="'required'"
                                    label="state*"
                            ></v-autocomplete>
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

<script src="./addcity.js"></script>

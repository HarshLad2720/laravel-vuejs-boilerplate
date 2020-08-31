<template>
    <v-dialog :value="value" @click:outside="onCancel()" @keydown.esc="onCancel()" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{isEditMode ? 'Update' : 'Add'}} City
            </v-card-title>

            <v-card-text>
                <!-- loader -->
                <v-progress-linear
                        :active="loading"
                        :indeterminate="loading"
                        absolute
                        bottom
                        color="light-blue"
                ></v-progress-linear>
                <!-- loader ends -->

                <!--the form will load once the loader is loaded-->
                <form v-if ="!loading" method="POST" name="" role="form">
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
                            <v-btn class="btn btn-primary" @click.native="addAction">
                                {{isEditMode ?  $getConst('BTN_UPDATE') : $getConst('BTN_SUBMIT') }}
                            </v-btn>
                            <v-btn class="btn btn-grey" @click.native="onCancel">
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

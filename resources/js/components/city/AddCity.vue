<template>
    <v-dialog :value="value" @click:outside="onCancel()" @keydown.esc="onCancel()" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{isEditMode ? 'Update' : 'Add'}} Role
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
                    <v-layout row wrap>
                        <v-flex xs12>
                            <p>City Name</p>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="City" type="text"
                                name="city"
                                v-model="model.name"
                                :error-messages="getErrorValue('city')"
                                v-validate="'required'"
                                solo
                            ></v-text-field>

                        </v-flex>
                        <v-flex xs12>
                            <p>Select State</p>
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
                                    dense
                                    filled
                                    label="state"
                                    solo
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn color="secondary" class="btn btn-grey m-b-10 m-t-10" @click.native="onCancel">
                                {{ $getConst('BTN_CANCEL') }}
                            </v-btn>
                            <v-btn color="success" class="btn btn-black m-b-10 m-t-10" @click.native="addAction">
                                {{isEditMode ?  $getConst('BTN_UPDATE') : $getConst('BTN_SUBMIT') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>

            </v-card-text>

        </v-card>


    </v-dialog>
</template>

<script src="./addcity.js"></script>

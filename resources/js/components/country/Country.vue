<template>
    <div>
        <v-tabs v-model="tab" class="mb-5">
            <v-tab key="Tab1">
                <p>User</p>
            </v-tab>
            <v-tab key="Tab2">
                <p>Import</p>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item key="Tab1">
                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="tableData"
                        :loading="loading"
                        :options.sync="options"
                        :items-per-page="limit"
                        :footer-props="footerProps"
                        :server-items-length="pageCount"
                        @update:options="updateTable"
                        class="elevation-1"
                        :show-select="true"
                        v-index="$getConst('COUNTRY')"
                >
                    <template v-slot:top>
                        <v-layout>
                            <v-flex xs12 sm12 md4 lg4>
                                <v-text-field v-model="options.search" label="Search" class="mx-4" prepend-inner-icon="search"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md8 lg8>
                                <div class="float-right mt-4">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-store="$getConst('COUNTRY')"
                                                   color="primary"
                                                   dark
                                                   class="mb-2 mr-2"
                                                   v-on="on"
                                                   @click="addCountry()"
                                            ><v-icon small>{{ icons.mdiPlus }}</v-icon></v-btn>
                                        </template>
                                        <span>Add Country</span>
                                    </v-tooltip>
                                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export="$getConst('COUNTRY')"></export-btn>
                                    <template v-if="selected.length>1">
                                    <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
                                    </template>
                                </div>
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item.id)"
                                v-update="$getConst('COUNTRY')"
                        >
                            {{ icons.mdiPencil }}
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item.id)"
                                v-destroy = "$getConst('COUNTRY')"
                        >
                            {{ icons.mdiDelete }}
                        </v-icon>
                    </template>

                </v-data-table>
                <add-country v-model="addCountryModal"></add-country>
                <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
            </v-tab-item>
            <v-tab-item key="Tab2">
                <v-card flat>
                    <v-card-text><p>Priyanka</p></v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script src="./country.js"></script>

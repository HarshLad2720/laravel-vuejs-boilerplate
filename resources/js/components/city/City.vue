<template>
    <div>
        <v-tabs v-model="tab" class="mb-5">
            <v-tab key="Tab1" @click.native="refreshData()">
                <p>City</p>
            </v-tab>
            <v-tab key="Tab2" v-importBulk="$getConst('CITY')" @click.native="importDataTable()">
                <p class="mt-2">Import</p>
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
                        @update:options="onUpdateOptions"
                        class="elevation-1"
                        :show-select="true"
                        v-index = "$getConst('CITY')"
                        ref="table"
                >
                    <template v-slot:top>
                        <v-layout>
                            <v-flex xs12 sm12 md4 lg4>
                                <v-text-field v-model="searchModel" @input="onSearch" label="Search" class="mx-4" prepend-inner-icon="search"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md8 lg8>
                                <div class="float-right mt-4">
                                    <v-menu
                                        v-model="filterMenu"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-y
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="mb-2 mr-2"
                                                   color="indigo"
                                                   dark
                                                   v-bind="attrs"
                                                   v-on="on"
                                            >
                                                <v-icon small>{{ icons.mdiFilter }}</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-card class="p-4">
                                            <v-list>
                                                <v-btn text @click="filterMenu = false" class="float-right filter-close-btn"><v-icon small>{{ icons.mdiClose }}</v-icon></v-btn>
                                                <v-select
                                                    v-model="state_id"
                                                    name="state"
                                                    item-text="name"
                                                    item-value="id"
                                                    :items="setStateList"
                                                    label="State"
                                                ></v-select>
                                            </v-list>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text @click="resetFilter()">Reset Filter</v-btn>
                                                <v-btn color="primary" text @click="changeFilter()">Apply Filter</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-store = "$getConst('CITY')"
                                                   color="primary"
                                                   dark
                                                   class="mb-2 mr-2"
                                                   v-on="on"
                                                   @click="addCity()"
                                            ><v-icon small>{{ icons.mdiPlus }}</v-icon></v-btn>
                                        </template>
                                        <span>Add City</span>
                                    </v-tooltip>
                                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export = "$getConst('CITY')"></export-btn>
                                    <template v-if="selected.length>1">
                                    <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps" v-deleteAll = "$getConst('CITY')"></multi-delete>
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
                                v-update = "$getConst('CITY')"
                        >
                            {{ icons.mdiPencil }}
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item.id)"
                                v-destroy = "$getConst('CITY')"
                        >
                            {{ icons.mdiDelete }}
                        </v-icon>
                    </template>

                </v-data-table>
            </v-tab-item>
            <v-tab-item key="Tab2">
                <v-card flat>
                    <v-card-text>
                        <import ref="importdata" :importProps="importProps"></import>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <add-city v-model="addCityModal"></add-city>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
    </div>
</template>

<script src="./city.js"></script>

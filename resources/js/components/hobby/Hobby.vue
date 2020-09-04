<template>
    <div>
        <v-tabs v-model="tab" class="mb-5" @change="refreshData()">
            <v-tab href="#tab1">
                <p>Hobby</p>
            </v-tab>
            <v-tab href="#tab2" v-importBulk="$getConst('HOBBY')">
                <p class="mt-2">Import</p>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item value="tab1">
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
                        v-index = "$getConst('HOBBY')"
                        ref="table"
                >
                    <template v-slot:top>

                        <v-layout>
                            <v-flex xs12 sm12 md4 lg4>
                                <v-text-field v-model="searchModel" @input="onSearch" label="Search" class="mx-4" prepend-inner-icon="search"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md8 lg8>
                                <div class="float-right mt-4">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-store = "$getConst('HOBBY')"
                                                   color="primary"
                                                   dark
                                                   class="mb-2 mr-2" v-on="on"
                                                   @click="addhobby()"
                                            ><v-icon small>{{ icons.mdiPlus }}</v-icon></v-btn>
                                        </template>
                                        <span>Add Hobby</span>
                                    </v-tooltip>
                                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export = "$getConst('HOBBY')"></export-btn>
                                    <template v-if="selected.length>1">
                                        <multi-delete @click.native="multipleDelete()" @multiDelete="getData()" ref="multipleDeleteBtn" :deleteProps="deleteProps" v-deleteAll = "$getConst('HOBBY')"></multi-delete>
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
                                v-update = "$getConst('HOBBY')"
                        >
                            {{ icons.mdiPencil }}
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item.id)"
                                v-destroy = "$getConst('HOBBY')"
                        >
                            {{ icons.mdiDelete }}
                        </v-icon>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item value="tab2">
                <v-card flat>
                    <v-card-text>
                        <import ref="importdata" :importProps="importProps"></import>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <add-hobby v-model="addCityModal"></add-hobby>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
    </div>
</template>

<script src="./hobby.js"></script>

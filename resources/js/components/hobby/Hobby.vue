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
                        v-index = "$getConst('HOBBY')"
                >
                    <template v-slot:top>
                        <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>Hobby</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-btn v-store = "$getConst('HOBBY')"
                                   color="primary"
                                   dark
                                   class="mb-2 mr-2"
                                   @click="addhobby()"
                            >Add Hobby</v-btn>
                            <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export = "$getConst('HOBBY')"></export-btn>
                        </v-toolbar>
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
                <add-hobby v-model="addCityModal" :paramRole="paramRole"></add-hobby>
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

<script src="./hobby.js"></script>

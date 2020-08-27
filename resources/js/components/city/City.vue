<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>City</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn v-store = "$getConst('CITY')"
                   color="primary"
                   dark
                   class="mb-2 mr-2"
                   @click="addCity()"
            >Add City</v-btn>
            <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export = "$getConst('CITY')"></export-btn>
            <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
        </v-toolbar>
        <v-flex xs12 sm12 md12 lg12 class="mx-4">
            <v-layout row wrap>
                <v-flex xs3 sm3 md3 lg3 class="p-4">
                    <v-select
                            v-model="state_id"
                            name="state"
                            item-text="name"
                            item-value="id"
                            :items="setStateList"
                            @change="changeFilter()"
                            label="State"
                    ></v-select>
                </v-flex>
                <v-flex xs3 sm3 md3 lg3 class="p-4">
                    <v-btn class="ma-2" tile outlined @click="resetFilter()">
                        <v-icon left>{{ icons.mdiFilter }}</v-icon> Reset Filter
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="tableData"
            :loading="loading"
            :options.sync="options"
            :items-per-page="limit"
            :server-items-length="pageCount"
            @update:options="updateTable"
            class="elevation-1"
            :show-select="true"
            v-index = "$getConst('CITY')"
        >
            <template v-slot:top>
                <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
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
        <add-city v-model="addCityModal" :paramRole="paramRole"></add-city>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
    </div>
</template>

<script src="./city.js"></script>

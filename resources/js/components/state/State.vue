<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>State</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn  v-store = "$getConst('STATE')"
                    color="primary"
                    dark
                    class="mb-2 mr-2"
                    @click="addSate()"
            >Add State</v-btn>
            <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps"  v-export = "$getConst('STATE')"></export-btn>
            <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
        </v-toolbar>
        <v-flex xs12 sm12 md12 lg12 class="mx-4">
            <v-layout row wrap>
                <v-flex xs3 sm3 md3 lg3 class="p-4">
                    <v-select
                            v-model="country_id"
                            name="country"
                            item-text="name"
                            item-value="id"
                            :items="setCountryList"
                            @change="changeFilter()"
                            label="Country"
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
            :footer-props="footerProps"
            :server-items-length="pageCount"
            @update:options="updateTable"
            class="elevation-1"
            :show-select="true"
            v-index = "$getConst('STATE')"
        >
            <template v-slot:top>
                <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item.id)"
                    v-update = "$getConst('STATE')"
                >
                    {{ icons.mdiPencil }}
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item.id)"
                    v-destroy = "$getConst('STATE')"
                >
                    {{ icons.mdiDelete }}
                </v-icon>
            </template>

        </v-data-table>
        <add-state v-model="addSateModal"></add-state>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
    </div>
</template>

<script src="./state.js"></script>

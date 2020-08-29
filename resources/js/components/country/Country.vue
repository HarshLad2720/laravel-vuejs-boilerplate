<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Country</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn v-store="$getConst('COUNTRY')"
                   color="primary"
                   dark
                   class="mb-2 mr-2"
                   @click="addCountry()"
            >Add Country</v-btn>
            <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export="$getConst('COUNTRY')"></export-btn>
            <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
        </v-toolbar>
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
                <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
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
    </div>
</template>

<script src="./country.js"></script>

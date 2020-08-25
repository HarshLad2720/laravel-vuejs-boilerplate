<template>
    <div>
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
        >
            <template v-slot:top>
                <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Roles</v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2 mr-2"
                        @click="addrole()"
                    >Add Role</v-btn>
                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps"></export-btn>
                    <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item.id)"
                >
                    {{ icons.mdiPencil }}
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item.id)"
                >
                    {{ icons.mdiDelete }}
                </v-icon>
            </template>

        </v-data-table>
        <add-role v-model="addRoleModal" :paramRole="paramRole"></add-role>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
    </div>
</template>

<script src="./role.js"></script>

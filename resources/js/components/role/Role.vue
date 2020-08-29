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
                            v-store="$getConst('ROLE')"
                    >Add Role</v-btn>
                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export="$getConst('ROLE')"></export-btn>
                    <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps"></multi-delete>
                </v-toolbar>
                <v-flex xs12 sm12 md12 lg12 class="mx-4">
                    <v-layout row wrap>
                        <v-flex xs3 sm3 md3 lg3 class="p-4">
                            <v-select
                                    v-model="role_id"
                                    name="role"
                                    item-text="name"
                                    item-value="id"
                                    :items="setRoleList"
                                    @change="changeFilter()"
                                    label="Role"
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
                        v-index="$getConst('ROLE')"
                >
                    <template v-slot:top>
                        <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item.id)"
                                v-update = "$getConst('ROLE')"
                        >
                            {{ icons.mdiPencil }}
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item.id)"
                                v-destroy = "$getConst('ROLE')"
                        >
                            {{ icons.mdiDelete }}
                        </v-icon>
                    </template>

                </v-data-table>
                <add-role v-model="addRoleModal" :paramRole="paramRole"></add-role>
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

<script src="./role.js"></script>

<template>
    <div>
        <v-tabs v-model="tab" class="mb-5">
            <v-tab @click.native="refreshData()" key="Tab1">
                <p>User</p>
            </v-tab>
            <v-tab key="Tab2" v-importBulk="$getConst('USER')" @click.native="importDataTable()">
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
                        :server-items-length="pageCount"
                        :footer-props="footerProps"
                        @update:options="onUpdateOptions"
                        class="elevation-1"
                        :show-select="true"
                        v-index="$getConst('USER')"
                        ref="table"
                >
                    <template v-slot:top>
                        <v-layout>
                            <v-flex xs12 sm12 md4 lg4>
                                <v-text-field v-model="searchModel" @input="onSearch" label="Search" class="mx-4 mt-4" prepend-inner-icon="search"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md8 lg8>
                                <div class="float-right mt-4">
                                    <v-menu
                                        v-model="filtermenu"
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
                                                <v-btn text @click="filtermenu = false" class="float-right filter-close-btn"><v-icon small>{{ icons.mdiClose }}</v-icon></v-btn>
                                                <v-select
                                                    v-model="role_id"
                                                    name="role"
                                                    item-text="name"
                                                    item-value="id"
                                                    :items="setRoleList"
                                                    @change=""
                                                    label="Role"
                                                    class="mt-4"
                                                ></v-select>
                                            </v-list>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text @click="resetFilter()">Reset Filter</v-btn>
                                                <v-btn color="primary" text @click="changeFilter()">Apply Filter</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                    <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps" v-export="$getConst('USER')"></export-btn>
                                    <template v-if="selected.length>1">
                                    <multi-delete @click.native="multipleDelete()" ref="multipleDeleteBtn" :deleteProps="deleteProps" v-deleteAll="$getConst('USER')"></multi-delete>
                                    </template>
                                </div>
                            </v-flex>
                        </v-layout>
                    </template>
                    <template v-slot:item.dob="{ item }">
                        <span>{{ getDateFormat(item.dob) }}</span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="onEdit(item.id)"
                                v-update = "$getConst('USER')"
                        >
                            {{ icons.mdiPencil }}
                        </v-icon>
                        <v-icon
                            small
                            class="mr-2"
                            @click="openGallery(item)"
                        >
                            {{ icons.mdiImage }}
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item.id)"
                                v-destroy = "$getConst('USER')"
                        >
                            {{ icons.mdiDelete }}
                        </v-icon>
                    </template>
                </v-data-table>
                <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>
                <custom-dialog v-model="customDialog" :title="customDialogTitle"
                               :message="customMessage"></custom-dialog>
            </v-tab-item>
            <v-tab-item key="Tab2">
                <v-card flat>
                    <v-card-text>
                        <import  ref="importdata" :importProps="importProps"></import>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <user-modal :paramProps="paramProps" v-model="userDialogue"></user-modal>
        <lightGallery
            :images="images"
            id="lightgallery"
            ref="lightGallery"
            :dynamic="true"
            :show-caption="true"
            :show-thumbs="true"
            :show-light-box="true"
        ></lightGallery>
    </div>
</template>

<script src="./users.js"></script>

<style scoped>
</style>

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
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                   <v-menu
                           :close-on-content-click="false"
                           :nudge-width="500"
                           offset-y
                   >
                       <template v-slot:activator="{on}">
                           <v-btn
                                   color="indigo"
                                   dark
                                   v-on="on"
                                   class="mb-2 mr-2"
                           >
                              Filter
                           </v-btn>
                       </template>

                       <v-card>
                           <v-select
                                   class="m-3"
                                   label="Solo field"
                                   solo
                           ></v-select>

                           <v-divider></v-divider>

                           <v-card-actions>
                               <v-spacer></v-spacer>

                               <v-btn text >Cancel</v-btn>
                               <v-btn color="primary" text>Save</v-btn>
                           </v-card-actions>
                       </v-card>
                   </v-menu>
                    <!--<v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="refresh()"
                    >New Item</v-btn>-->
                   <export-btn @click.native="setExport()" ref="exportbtn" :exportProps="exportProps"></export-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="onEdit(item.id)"
                >
<!--                     v-update = "$getConst('USER')"-->
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
        <user-modal :paramProps="paramProps" v-model="userDialogue"></user-modal>
        <delete-modal  v-model="modalOpen" :paramProps="paramProps" :confirmation="confirmation"></delete-modal>

    </div>
</template>

<script src="./users.js"></script>

<style scoped>
</style>

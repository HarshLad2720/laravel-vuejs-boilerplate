<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tableData"
            :loading="loading"
            :options.sync="options"
            :items-per-page="limit"
            :server-items-length="pageCount"
            @update:options="updateTable"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-text-field v-model="options.search" label="Search" class="mx-4"></v-text-field>
                <!--                <v-select v-model="roleId" :items="roleList" item-text="name" item-value="id" label="Role" @change="setFilter()"></v-select>-->
                <v-toolbar flat color="white">
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="refresh()"
                    >New Item</v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="onEdit(item.id)"
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
        <delete-modal v-model="modalOpen" :Confirmation="Confirmation"></delete-modal>

<!--        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>-->
        <user-modal :paramProps="paramProps" v-model="userDialogue"></user-modal>

    </div>
</template>

<script src="./users.js"></script>

<style scoped>
</style>

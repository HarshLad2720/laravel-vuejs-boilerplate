<template>
    <div>
        <v-container fluid class="">
            <v-card class="m-b-20">
                <v-toolbar>
                    <v-toolbar-title>Permission</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <div class="grey-bg p-t-20 p-b-20">
                    <form method="POST" name="permission_form" role="form" enctype="multipart/form-data" id="permission_form">
                        <v-layout row wrap class="pl-5 pr-5">
                            <v-flex lg12 md12 sm12 xs12>
                                <v-select solo style="margin-top: 30px;margin-bottom: 20px;  "
                                    :items="roleList"
                                    item-value="id"
                                    item-text="name"
                                    name="role_id"
                                    v-model="role_id"
                                    label="Role"
                                    hint="Permissions Data"
                                    @change="getPermissions"
                                    persistent-hint
                                ></v-select>
                            </v-flex>
                            <span>Check all permissions that apply to this role</span>
                        </v-layout>
                        <v-layout row wrap class="pl-5 pr-5">
                            <v-flex xs12 sm12 md12 lg12 class="">
                                <div class="myproduct-table">
                                    <table class="table borderless" v-if="permissions.length > 0">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Can Access</th>
                                            <th>Can Edit</th>
                                            <th>Can Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="permission in permissions" :key="permission.id" >
                                            <td :colspan="permission.is_third_level == '1' ? '4' : ''">{{permission.display_name}}
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon v-on="on">
                                                            help
                                                        </v-icon>
                                                    </template>
                                                    <span>{{permission.display_name}}</span>
                                                </v-tooltip>
                                                <table class="table borderless" v-if="permission.is_third_level == '1'">
                                                    <tbody>
                                                    <tr v-for="subPermission in permission.sub_permissions" :key="subPermission.id">
                                                        <td class="pl-10">{{subPermission.display_name}}</td>
                                                        <td v-for="third_level_permission in subPermission.sub_permissions" :key="third_level_permission.id"><v-checkbox
                                                            type="checkbox"
                                                            v-model="third_level_permission.is_permission"
                                                            @change="editPermission(third_level_permission)"
                                                            true-value="1"
                                                            false-value="0"
                                                            v-can-edit="$getConst('MY_PREFERENCE_BUSINESS')"
                                                        ></v-checkbox>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <template v-if="permission.is_third_level != '1'">
                                                <td v-for="subPermission in permission.sub_permissions" :key="subPermission.id"><v-checkbox
                                                    type="checkbox"
                                                    v-model="subPermission.is_permission"
                                                    @change="editPermission(subPermission)"
                                                    true-value="1"
                                                    false-value="0"
                                                    v-can-edit="$getConst('MY_PREFERENCE_BUSINESS')"
                                                ></v-checkbox>
                                                </td>
                                            </template>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </v-flex>
                        </v-layout>
                    </form>
                </div>
            </v-card>
        </v-container>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
    </div>

</template>

<script src="./permission.js"></script>

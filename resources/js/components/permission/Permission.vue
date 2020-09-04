<template>
    <div>
        <v-container fluid class="">
            <v-card class="m-b-20">
                <v-toolbar>
                    <v-toolbar-title>Permission</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <div class="grey-bg p-t-20 p-b-20">
                    <form method="POST" name="permission_form" role="form" enctype="multipart/form-data"
                          id="permission_form">
                        <v-layout row wrap class="pl-5 pr-5">
                            <v-flex lg12 md12 sm12 xs12>
                                <v-select class="mb-5 mt-7" v-getPermissionsByRole="$getConst('ROLE')"
                                          :items="roleList"
                                          item-value="id"
                                          item-text="name"
                                          name="role_id"
                                          v-model="role_id"
                                          label="Role"
                                          @change="getPermissions"
                                          persistent-hint
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap class="pl-5 pr-5">
                            <v-flex xs12 sm12 md12 lg12 class="">
                                <div class="permission-table">
                                    <table class="table borderless table-responsive" v-if="permissions.length > 0">
                                        <tbody v-setUnsetPermissionToRole="$getConst('PERMISSION')">
<!--                                        {{permissions}}-->
                                        <tr v-for="permission in permissions" :key="permission.id">
                                            <td :colspan="permission.is_third_level && permission.is_third_level == '1' ? '4' : ''">
                                                <label class="main-permission-label">{{permission.display_name}}</label>
                                            </td>
                                            <template
                                                v-if="!permission.is_third_level || permission.is_third_level != '1'">
                                                <td v-for="subPermission in permission.sub_permissions"
                                                    :key="subPermission.id">
                                                    <v-checkbox
                                                        type="checkbox"
                                                        v-model="subPermission.is_permission"
                                                        @change="editPermission(subPermission)"
                                                        true-value="1"
                                                        false-value="0"
                                                        :label="subPermission.display_name"
                                                        v-setUnsetPermissionToRole="$getConst('PERMISSION')"
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

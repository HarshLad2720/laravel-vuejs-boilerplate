<script src="user-modal.js"></script>
<template>
    <v-dialog :value="value" content-class="modal-dialog w70" scrollable @click:outside="onCancel()" @keydown.esc="onCancel()">
        <v-card>
            <v-card-title
                class="headline black-bg mb-4" primary-title>
                <span>{{isEditMode ? this.$getConst('TXT_UPDATE') : this.$getConst('TXT_CREATE')}} User</span>
            </v-card-title>

            <v-card-text>
                <register-form @register-form-emit="registerForm" @cancel="onCancel()"></register-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script src="./user-modal.js"></script>

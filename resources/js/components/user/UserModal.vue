<script src="user-modal.js"></script>
<template>
    <v-dialog :value="value" content-class="modal-dialog" @click:outside="onCancel()" @keydown.esc="onCancel()">
        <v-card>
            <v-card-title
                class="headline black-bg mb-4" primary-title>
                <span>{{isEditMode ? 'Update' : 'Create'}} User</span>
            </v-card-title>

            <v-card-text>
                <register-form @register-form-emit="registerForm" @cancel="onCancel()"></register-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script src="./user-modal.js"></script>

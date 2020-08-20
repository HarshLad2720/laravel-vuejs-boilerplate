<template>
    <v-dialog :value="value" content-class="modal-dialog" @click:outside="onCancel()" @keydown.esc="onCancel()">
        <v-card>
            <v-card-title
                class="headline black-bg" primary-title>
                <span>{{isEditMode ? 'Update' : 'Create'}} User</span>
            </v-card-title>

            <v-card-text>
                <register-form></register-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script src="./user-modal.js"></script>

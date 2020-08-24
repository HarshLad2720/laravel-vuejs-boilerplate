<template>
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
</template>

<script src="./userfilter.js"></script>

<template>
  <v-container>
    <v-layout text-center wrap>
      <v-data-table :headers="headers" :items="sites" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.latitude" label="Latitude"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.longitude" label="Longitude"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.imageUrl" label="Image Url"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">{{editIcon}}</v-icon>
          <v-icon small @click="deleteItem(item)">{{removeIcon}}</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiTableEdit, mdiTableRemove } from '@mdi/js';
import { getModule } from 'vuex-module-decorators'
import SiteModule from '../store/modules/site'
const siteModule = getModule(SiteModule)

import { ISiteItem } from '../types/siteItem';

export default Vue.extend({
  name: 'Main',

  data: () => ({
    editIcon: mdiTableEdit,
    removeIcon: mdiTableRemove,
    dialog: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Address', value: 'address' },
      { text: 'Latitude', value: 'latitude' },
      { text: 'Longitude', value: 'longitude' },
      { text: 'Image Url', value: 'imageUrl' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    sites: [] as ISiteItem[],
    editedIndex: -1,


    editedItem: {
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
      description: '',
    },
    defaultItem: {
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
      description: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      await this.getSites();
    },

    editItem(item: any) {
      this.editedIndex = this.sites.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item: any) {
      const index = this.sites.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        this.sites.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sites[this.editedIndex], this.editedItem);
      } else {
        this.sites.push(this.editedItem);
      }
      this.close();
    },

    async getSites() {
      await siteModule.fetchSites()
    }
  },
});
</script>

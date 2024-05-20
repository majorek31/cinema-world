<template>
    <!-- {{ messages.data }} -->
    <b-field>
        <b-checkbox v-model="showRead">
            Pokaż przeczytane
        </b-checkbox>
    </b-field>
    <b-table :data="messages.data.filter((element) => showRead ? true : !element.hasBeenRead)" hoverable selected.sync @click="updateCurrent">
        <b-table-column field="id" label="ID" v-slot="props">
            {{ props.row.id }}
        </b-table-column>
        <b-table-column field="email" label="Adres Email" v-slot="props">
            {{ props.row.email }}
        </b-table-column>
        <b-table-column field="hasBeenRead" label="Przeczytana" v-slot="props">
            {{ props.row.hasBeenRead ? "Tak" : "Nie" }} 
        </b-table-column>
        <b-table-column label="Akcje" width="20%" v-slot="props">
            <div class="buttons">
                <button class="button is-primary" @click="showModal(props.row.id)">Zobacz</button>
                <b-modal 
                    v-if="currentMessage"
                    v-model="isActive"
                    has-modal-card
                    trap-focus
                    :destroy-on-hide="false"
                    aria-role="dialog"
                    aria-label="Example Modal"
                    close-button-aria-label="Close"
                    aria-modal>
                    <template #default="props">
                        <div class="modal-card" >
                            <div class="modal-card-head">
                                <div class="modal-card-title">
                                    Wiadomość od {{ currentMessage.email }}
                                </div>
                            </div>
                            <div class="modal-card-body">
                                <p>{{ currentMessage.message }}</p>
                            </div>
                            <div class="modal-card-foot">
                                <b-button label="Zamknij" @click="closeModal(currentMessage.id)"/>
                            </div>
                        </div>
                    </template>
                </b-modal>
                <!-- <b-modal v-model="isActive" has-modal-card>
                    <template>
                        <div class="modal-form">
                            {{props.row.id}}

                        </div>
                    </template>
                </b-modal> -->
                <!-- <button class="button is-danger" @click="deleteCurrent">Usuń</button> -->
            </div>
        </b-table-column>
    </b-table>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import { ModalProgrammatic } from 'buefy';
import { reactive, ref } from 'vue';
const showRead = ref(false);
const isActive = ref(false);
const authStore = useAuthStore();
const currentMessage = ref();
const messages = ref({});
async function fetchData() {
    messages.value = (await axios.get("/api/message", {
    headers: {
        Authorization: "Bearer " + authStore.token
    }
    })).data;
}
messages.value = (await axios.get("/api/message", {
    headers: {
        Authorization: "Bearer " + authStore.token
    }
})).data;
async function closeModal(id) {
    isActive.value = false;
    await axios.put('/api/message/' + id, undefined, {
        headers: {
            Authorization: "Bearer " + authStore.token
        }
    });
}
async function showModal(modal:number) {
    currentMessage.value = messages.value;
    // while (!currentMessage);
    isActive.value = true;
}
async function deleteCurrent() {
    // console.log(messages.value);
}
function updateCurrent(payload) {
    currentMessage.value = payload;
    console.log(payload);
}
</script>
  
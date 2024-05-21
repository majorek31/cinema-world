<template>
    <h1 class="title has-text-centered" v-if="filtered.length === 0">
        Nie masz żadnego biletu
    </h1>
    <b-table :data="filtered" v-else>
        <b-table-column field="id" label="ID" v-slot="props">
            {{ props.row.id }}
        </b-table-column>
        <b-table-column field="movie" label="Film" v-slot="props">
            {{ props.row.movie.title }}
        </b-table-column>
        <b-table-column field="genre" label="Data" v-slot="props">
            {{ new Date(props.row.when).toLocaleString() }}
        </b-table-column>
        <b-table-column label="Akcje" v-slot="props" width="10vw">
            <div class="buttons">
                <button class="button is-danger" @click="processCancel($buefy, props.row.id)">
                    Anuluj bilet
                </button>
            </div>
        </b-table-column>
    </b-table>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import type { BuefyNamespace } from 'buefy';
import type { BDialogConfig } from 'buefy/src/types/components';
import { computed, ref } from 'vue';
const removed = ref([]);
const authStore = useAuthStore();
async function processCancel(buefy: BuefyNamespace, id: number) {
    buefy.dialog.confirm({
        async onConfirm(value, dialog) {
            removed.value.push(id);
            await axios.delete('/api/ticket/' + id, {
                headers: {
                    Authorization: 'Bearer ' + authStore.token
                }
            });
        },
        confirmText: "Tak",
        message: "Czy napewno chcesz anulować ten bilet?",
        cancelText: "Nie",
    } as BDialogConfig)
}
const tickets = (await axios.get("/api/ticket", {
    headers: {
        Authorization: 'Bearer ' + authStore.token
    }
})).data;
const filtered = computed(() => tickets.filter((v) => !removed.value.includes(v.id)));

</script>
import { DialogProgrammatic as Dialog } from "buefy";
import { defineStore } from "pinia";

export const useDialogStore = defineStore('dialog', {
    actions: {
        confirm(msg: string) {
            Dialog.confirm({
                message: msg
            });
        }
    }
});
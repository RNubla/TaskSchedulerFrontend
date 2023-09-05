import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import MultiSelect from "primevue/multiselect";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import TriStateCheckbox from "primevue/tristatecheckbox";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("DataTable", DataTable)
    nuxtApp.vueApp.component("Column", Column)
    nuxtApp.vueApp.component("MultiSelect", MultiSelect)
    nuxtApp.vueApp.component("Dropdown", Dropdown)
    nuxtApp.vueApp.component("TriStateCheckbox", TriStateCheckbox)
    nuxtApp.vueApp.component("InputText", InputText)
    nuxtApp.vueApp.component("Tag", Tag)
    //other components that you need
});
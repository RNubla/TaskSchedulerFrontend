<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
const jobs = ref()
const loading = ref(true)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

onMounted(async () => {
    await fetch('https://localhost:7202/api/TaskScheduler').then(res => res.json()).then(data => jobs.value = data)
})
</script>

<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="jobs" paginator :rows="10"
            :globalFilterFields="['path', 'name', 'state', 'lastRunTime', 'nextRunTime', 'lastTaskResult', 'enabled']">
            <template #header>
                <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>
            <template #empty> No Task Found</template>
            <template #loading> Loading jobs from Task Scheduler. Please Wait.</template>
            <Column field="path" header="Path" style="min-width: 12rem;" filterField="path">
                <template #body="{ data }">{{ data.path }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search Path"></InputText>
                </template>
            </Column>
            <Column field="name" header="Name" style="min-width: 12rem;" filterField="name">
                <template #body="{ data }">{{ data.name }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search By Name"></InputText>
                </template>
            </Column>
            <Column field="state" header="State" style="min-width: 12rem;" filterField="state">
                <template #body="{ data }">{{ data.state }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search By State"></InputText>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
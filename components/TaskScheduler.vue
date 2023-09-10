<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';
const jobs = ref()
const loading = ref(true)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    path: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.NOT_CONTAINS }] },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
    lastRunTime: { value: null, matchMode: FilterMatchMode.DATE_IS },
    nextRunTime: { value: null, matchMode: FilterMatchMode.DATE_IS },
    lastTaskResult: { value: null, matchMode: FilterMatchMode.EQUALS },
})

onMounted(async () => {
    fetchData()
    loading.value = false
})

const fetchData = async () => {
    const response = await fetch('http://localhost:8080/TaskScheduler')
    response.json().then((data) => jobs.value = transformData(data)).catch((err) => console.error(err))
}

const transformData = (data) => {
    return [...(data || [])].map((d) => {
        // console.log(d)
        d.lastRunTime = formatDate(d.lastRunTime)
        d.nextRunTime = formatDate(d.nextRunTime)
        return d
    });
}

const formatDate = (value: string) => {
    const date = new Date(value)
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
};

const states = ref([
    'UNKNOWN',
    'DISABLED',
    'QUEUED',
    'READY',
    'RUNNING'
])
</script>

<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="jobs" stripedRows paginator :rows="10" dataKey="id"
            filterDisplay="menu" :loading="loading"
            :globalFilterFields="['path', 'name', 'state', 'lastRunTime', 'nextRunTime', 'lastTaskResult']">
            <template #header>
                <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search the whole table" />
                    </span>
                    <Button label="Refresh" @click="fetchData" />
                </div>
            </template>
            <template #empty> No Task Found</template>
            <template #loading> Loading jobs from Task Scheduler. Please Wait.</template>
            <Column field="path" header="Path" style="min-width: 12rem;" filterField="path">
                <template #body="{ data }">
                    {{ data.path }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search Path"></InputText>
                </template>
            </Column>
            <Column field="name" header="Name" sortable style="min-width: 12rem;" filterField="name">
                <template #body="{ data }">{{ data.name }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search By Name"></InputText>
                </template>
            </Column>
            <Column field="state" header="State" style="min-width: 12rem;" filterField="state">
                <template #body="{ data }">{{ data.state }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" type="text" :options="states" @input="filterCallback()"
                        class="p-column-filter" placeholder="Search By State"></Dropdown>
                </template>
            </Column>
            <Column field="lastRunTime" header="Last Run Time" style="min-width: 12rem;" filterField="lastRunTime">
                <template #body="{ data }">{{ data.lastRunTime }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Last Run Time"></InputText>
                </template>
            </Column>
            <Column field="nextRunTime" header="Next Run Time" style="min-width: 12rem;" filterField="nextRunTime">
                <template #body="{ data }">{{ data.nextRunTime }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Next Run Time"></InputText>
                </template>
            </Column>
            <Column field="lastTaskResult" header="Last Task Result" style="min-width: 12rem;" filterField="lastTaskResult">
                <template #body="{ data }">{{ data.lastTaskResult }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Last Task Result"></InputText>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
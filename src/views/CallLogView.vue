<script setup lang="ts">
import LogItem from '@/components/LogItem.vue'
import { useContactsStore } from '@/stores/contacts'
import { useLogStore } from '@/stores/log'
import { computed } from 'vue'

const emit = defineEmits(['call'])

const logStore = useLogStore()
const contactsStore = useContactsStore()

const clearAllLogs = () => {
    logStore.clearLog()
}

const logs = computed(() => {
    return logStore.log.map((log) => {
        return {
            phone: log.phone,
            name: contactsStore.getContactByPhone(log.phone)?.name,
            timestamp: log.timestamp
        }
    })
})

const call = (phone: string) => {
    emit('call', phone)
}
</script>

<template>
    <div class="container">
        <a class="button" @click="clearAllLogs">Clear All Logs</a>
        <LogItem
            v-for="log in logs"
            :key="log.timestamp.toString()"
            :phone="log.phone"
            :name="log.name"
            :timestamp="log.timestamp"
            @call="call"
        />
        <div v-if="logs.length === 0" class="empty">
            <p>No logs</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 24px);
    padding: calc(var(--unit) * 32px);
    overflow-y: auto;
    height: 0px;
}

.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc(var(--unit) * 32px);
    opacity: 0.5;
}
</style>

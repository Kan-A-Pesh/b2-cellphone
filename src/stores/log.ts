import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', () => {
    const log = ref([
        { phone: '911', timestamp: new Date(2024, 0, 5, 12, 30) },
        { phone: '01 23 45 67 89', timestamp: new Date(2021, 0, 5, 12, 30) },
        { phone: '01 22 34 55 67', timestamp: new Date(2021, 0, 5, 12, 30) }
    ])

    const addLog = (phone: string) => {
        log.value.unshift({ phone, timestamp: new Date() })
    }

    const clearLog = () => {
        log.value = []
    }

    const logCount = computed(() => log.value.length)

    return {
        log,
        addLog,
        clearLog,
        logCount
    }
})

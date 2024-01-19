<script setup lang="ts">
import { defineProps } from 'vue'
import { PhoneCall } from 'lucide-vue-next'

const props = defineProps({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: true
    }
})

const displayName = props.name ?? props.phone
const displayDate = props.timestamp.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})

const emit = defineEmits(['call'])

const call = () => {
    emit('call', props.phone)
}
</script>

<template>
    <div class="card">
        <div class="infos">
            <h1 class="h6">{{ displayName }}</h1>
            <span class="subtitle">{{ displayDate }}</span>
        </div>
        <PhoneCall :size="24" class="call" @click="call" />
    </div>
</template>

<style scoped>
.card {
    background-color: rgba(255, 255, 255, 0.1);

    padding: calc(var(--unit) * 16px) calc(var(--unit) * 24px);
    border-radius: calc(var(--unit) * 16px);

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.infos {
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 4px);
}

.subtitle {
    opacity: 0.5;
}

.call:hover {
    cursor: pointer;
    color: var(--color-active);
}
</style>

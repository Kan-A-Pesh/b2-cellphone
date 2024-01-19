<script setup lang="ts">
import { defineProps } from 'vue'
import { X, PhoneCall } from 'lucide-vue-next'

const props = defineProps({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['delete', 'call'])

const deleteContact = () => {
    emit('delete', props.phone)
}

const call = () => {
    emit('call', props.phone)
}
</script>

<template>
    <div class="card">
        <div class="infos">
            <h1 class="h6">{{ props.name }}</h1>
            <span class="subtitle">{{ props.phone }}</span>
        </div>
        <PhoneCall :size="24" class="call" @click="call" />
        <X :size="24" class="cross" @click="deleteContact" />
    </div>
</template>

<style scoped>
.card {
    background-color: rgba(255, 255, 255, 0.1);

    padding: calc(var(--unit) * 16px) calc(var(--unit) * 24px);
    border-radius: calc(var(--unit) * 16px);

    display: flex;
    align-items: center;
    gap: calc(var(--unit) * 16px);
}

.infos {
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 4px);
    margin-right: auto;
}

.subtitle {
    opacity: 0.5;
}

.cross:hover {
    cursor: pointer;
    color: var(--color-active);
}
</style>

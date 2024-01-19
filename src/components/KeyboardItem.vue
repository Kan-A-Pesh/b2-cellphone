<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
    classes: {
        type: String,
        default: ''
    }
})

defineEmits(['click'])
</script>

<template>
    <button class="key" :class="classes" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<style scoped>
.key {
    background: #c4c4c420;
    width: var(--key-size);
    height: var(--key-size);
    border: none;
    border-radius: 50%;
    color: var(--color-text);
    font-size: calc(var(--unit) * 32px);

    display: flex;
    justify-content: center;
    align-items: center;
}

.key:not(.empty):hover {
    cursor: pointer;
    background: #c4c4c440;
}

.key.active {
    background: var(--color-active);
}

.key.active:hover {
    background: var(--color-active-dark);
    color: var(--color-muted);
}

.key.empty {
    visibility: hidden;
}
</style>

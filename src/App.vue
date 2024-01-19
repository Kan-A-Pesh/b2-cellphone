<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Keyboard, BookUser, NotebookTabs } from 'lucide-vue-next'
import { ref } from 'vue'

import CallModal from '@/components/modals/CallModal.vue'
import { useLogStore } from './stores/log'

const calling = ref(false)
const callNumber = ref('')

const logStore = useLogStore()

const call = (number: string | null) => {
    if (!number || number.length === 0) {
        calling.value = false
        callNumber.value = ''
        return
    }
    calling.value = true
    callNumber.value = number

    logStore.addLog(callNumber.value)
}
</script>

<template>
    <main>
        <RouterView v-on:call="call" />
    </main>

    <CallModal v-if="calling" :number="callNumber" @call="call" />

    <nav>
        <RouterLink to="/">
            <div class="link">
                <Keyboard :size="24" />
                <span>Keypad</span>
            </div>
        </RouterLink>
        <RouterLink to="/contacts">
            <div class="link">
                <BookUser :size="24" />
                <span>Contacts</span>
            </div>
        </RouterLink>
        <RouterLink to="/log">
            <div class="link">
                <NotebookTabs :size="24" />
                <span>Call Log</span>
            </div>
        </RouterLink>
    </nav>
</template>

<style scoped>
main {
    flex-grow: 1;
    max-width: 480px;
    width: 100%;
    margin: calc(var(--unit) * 32px) 10vw;
    display: flex;
    flex-direction: column;
}

nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: calc(var(--unit) * 32px);
    gap: calc(var(--unit) * 16px);
    margin-bottom: calc(var(--unit) * 32px);
    min-width: min(480px, 100%);
}

nav .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--unit) * 8px);
    color: var(--color-text);
    text-decoration: none;
}

@media screen and (max-width: 480px) {
    nav .link span {
        display: none;
    }
}
</style>

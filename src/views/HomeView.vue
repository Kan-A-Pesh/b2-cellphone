<script setup lang="ts">
import { computed, ref } from 'vue'
import KeyboardItem from '@/components/KeyboardItem.vue'
import KeyboardContainer from '@/components/KeyboardContainer.vue'
import { Phone, Delete } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'

const emit = defineEmits(['call'])

const contactsStore = useContactsStore()

const padKeys = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'])

const number = ref('')

const formattedNumber = computed(() => {
    if (number.value.length > 10) return number.value

    const formatted = number.value.replace(/\s/g, '')
    const groups = formatted.match(/.{1,2}/g)
    return groups ? groups.join(' ') : ''
})

const formattedName = computed(() => {
    return contactsStore.getContactByPhone(number.value)?.name
})

const appendNumber = (num: string) => {
    number.value += num
}

const removeNumber = () => {
    number.value = number.value.slice(0, -1)
}

const clearNumber = () => {
    number.value = ''
}

const call = () => {
    emit('call', number.value)
    clearNumber()
}

const addUrl = computed(() => {
    return `/add-contact?phone=${number.value}`
})
</script>

<template>
    <div class="number-container">
        <span v-if="formattedName">{{ formattedName }}</span>
        <span v-else-if="number.length > 0" class="unkown">Unkown number</span>
        <h1 class="number h3" v-if="number.length > 0">
            {{ formattedNumber }}
        </h1>
        <RouterLink :to="addUrl" class="p" v-if="number.length > 0">Add Number</RouterLink>
    </div>
    <div class="keyboard-container">
        <KeyboardContainer>
            <template v-for="key in padKeys" :key="key">
                <KeyboardItem @click="appendNumber(key)">
                    {{ key }}
                </KeyboardItem>
            </template>

            <KeyboardItem classes="empty" />

            <KeyboardItem classes="active" @click="call">
                <Phone :size="24" />
            </KeyboardItem>

            <KeyboardItem v-if="number.length > 0" @click="removeNumber">
                <Delete :size="24" />
            </KeyboardItem>
        </KeyboardContainer>
    </div>
</template>

<style scoped>
.number-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 180px;
    gap: calc(var(--unit) * 16px);
}

.number {
    letter-spacing: 1.5px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 90%;
}

.unkown {
    opacity: 0.1;
}

.keyboard-container {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

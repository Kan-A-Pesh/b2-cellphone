<script setup lang="ts">
import { useContactsStore } from '@/stores/contacts'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()
const phoneParam = route.query.phone?.toString() ?? ''

const name = ref('')
const phone = ref(phoneParam)

const changePhone = (e: any) => {
    let value = e.target.value
    // Keep only numbers
    value = value.replace(/\D/g, '')
    phone.value = value

    clearError()
}

const formattedNumber = computed(() => {
    if (phone.value.length > 10) return phone.value

    const formatted = phone.value.replace(/\D/g, '')
    const groups = formatted.match(/.{1,2}/g)
    return groups ? groups.join(' ') : ''
})

const contactsStore = useContactsStore()

const addContact = () => {
    if (!name.value || !phone.value) {
        error.value = 'Please fill in all fields'
        return
    }

    try {
        contactsStore.addContact(name.value, phone.value)
        router.push('/contacts')
    } catch (e: any) {
        error.value = e.message
        return
    }
}

const error = ref('')
const clearError = () => {
    error.value = ''
}
</script>

<template>
    <div class="container">
        <h1 class="h3">Add Contact</h1>

        <div class="form">
            <div class="input-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" @input="clearError" />
            </div>

            <div class="input-group">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" :value="formattedNumber" @input="changePhone" />
            </div>
        </div>

        <a href="#" @click="addContact" class="button">Add</a>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<style scoped>
.container {
    margin: auto 0;
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 64px);
}

.form {
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 32px);
}

.error {
    color: var(--color-active);
}
</style>

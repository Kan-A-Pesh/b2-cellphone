<script setup lang="ts">
import { useContactsStore } from '@/stores/contacts'
import { defineEmits, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ContactItem from '@/components/ContactItem.vue'

const emit = defineEmits(['call'])

const contactsStore = useContactsStore()

const contacts = computed(() => {
    return contactsStore.contacts
})

const deleteContact = (phone: string) => {
    contactsStore.removeContactByPhone(phone)
}

const call = (phone: string) => {
    emit('call', phone)
}
</script>

<template>
    <div class="container">
        <RouterLink to="/add-contact" class="button">Add Contact</RouterLink>
        <ContactItem
            v-for="contact in contacts"
            :key="contact.phone"
            :phone="contact.phone"
            :name="contact.name"
            @delete="deleteContact"
            @call="call"
        />
        <div v-if="contacts.length === 0" class="empty">
            <p>No contacts</p>
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

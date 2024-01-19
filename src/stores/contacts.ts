import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', () => {
    const contacts = ref([
        { phone: '911', name: 'Emergency' },
        { phone: '01 23 45 67 89', name: 'John Doe' },
        { phone: '98 76 54 32 10', name: 'Jane Foo' }
    ])

    const addContact = (name: string, phone: string) => {
        if (contacts.value.find((contact) => contact.phone === phone)) {
            throw new Error('Contact already exists')
        }

        contacts.value.push({ name, phone })
    }

    const removeContact = (index: number) => {
        contacts.value.splice(index, 1)
    }

    const removeContactByPhone = (phone: string) => {
        const index = contacts.value.findIndex((contact) => contact.phone === phone)
        if (index !== -1) {
            contacts.value.splice(index, 1)
        }
    }

    const getContact = (index: number) => {
        return contacts.value[index]
    }

    const getContactByPhone = (phone: string) => {
        return contacts.value.find((contact) => contact.phone === phone) || null
    }

    const contactCount = computed(() => contacts.value.length)

    return {
        contacts,
        addContact,
        removeContact,
        removeContactByPhone,
        getContact,
        getContactByPhone,
        contactCount
    }
})

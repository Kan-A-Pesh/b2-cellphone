<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useContactsStore } from '@/stores/contacts'
import KeyboardContainer from '../KeyboardContainer.vue'
import KeyboardItem from '../KeyboardItem.vue'
import { PhoneOff, MicOff, Keyboard, Speaker, Plus, Video, User } from 'lucide-vue-next'

const props = defineProps({
    number: {
        type: String,
        required: true
    }
})

const contactsStore = useContactsStore()

const name = computed(() => {
    return contactsStore.getContactByPhone(props.number)?.name
})

const formattedNumber = computed(() => {
    const formatted = props.number.replace(/\s/g, '')
    const groups = formatted.match(/.{1,2}/g)
    return groups ? groups.join(' ') : ''
})

const formattedName = computed(() => {
    return name.value ?? formattedNumber.value
})

const profileUrl = computed(() => {
    if (!name.value)
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWO_H-9BZRJ1tpCNYmAJxw1m4wI73LuB6iw&usqp=CAU'
    const names = name.value.split(' ').splice(0, 2)
    const initials = names.map((name: string) => name.toUpperCase().slice(0, 1)).join('')
    return `https://place-hold.it/200x200/424649/FFFFFF.png&text=${initials}&bold&fontsize=50`
})
</script>

<template>
    <div class="container modal-wrapper">
        <div class="container modal">
            <div class="header-wrapper">
                <img :src="profileUrl" alt="Profile" class="image" />
                <div class="header">
                    <h1 class="h3 phone">{{ formattedName }}</h1>
                    <h6 v-if="name">{{ formattedNumber }}</h6>
                </div>
            </div>

            <div class="body">
                <KeyboardContainer :columns="3" :rows="2">
                    <KeyboardItem>
                        <MicOff :size="24" />
                    </KeyboardItem>
                    <KeyboardItem>
                        <Keyboard :size="24" />
                    </KeyboardItem>
                    <KeyboardItem>
                        <Speaker :size="24" />
                    </KeyboardItem>
                    <KeyboardItem>
                        <Plus :size="24" />
                    </KeyboardItem>
                    <KeyboardItem>
                        <Video :size="24" />
                    </KeyboardItem>
                    <KeyboardItem>
                        <User :size="24" />
                    </KeyboardItem>
                </KeyboardContainer>
            </div>

            <div class="footer">
                <KeyboardContainer :columns="1" :rows="1">
                    <KeyboardItem classes="active" @click="$emit('call', null)">
                        <PhoneOff :size="24" />
                    </KeyboardItem>
                </KeyboardContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    background-color: rgba(0, 0, 0, 0.2);

    --blur: 16px;
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    -moz-backdrop-filter: blur(var(--blur));
    -ms-backdrop-filter: blur(var(--blur));
    -o-backdrop-filter: blur(var(--blur));

    gap: calc(var(--unit) * 64px);
}

.modal {
    width: 100%;

    gap: calc(var(--unit) * 128px);
}

.header-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: calc(var(--unit) * 32px);
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: calc(var(--unit) * 8px);
}

.image {
    width: calc(var(--unit) * 64px);
    height: calc(var(--unit) * 64px);
    border-radius: 50%;
    object-fit: cover;
}

.phone {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
}
</style>

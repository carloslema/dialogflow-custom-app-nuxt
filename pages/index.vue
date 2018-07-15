<template>
    <div class="columns">
        <div class="column">
            <chat-box></chat-box>
        </div>
        <div class="column">
            <custom-form></custom-form>
        </div>
    </div>
</template>

<script>
import chatBox from '~/components/chatBox.vue';
import customForm from '~/components/customForm.vue';

export default {
    components: {
        chatBox,
        customForm
    }
}
</script>

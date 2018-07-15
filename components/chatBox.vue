<template>
    <div>
        <article class="message is-dark">
            <div class="message-header withImg" :style="{ backgroundColor: $store.state.headerColor }">
                <img :src="$store.state.avatarIcon">
                <p>{{$store.state.name}}</p>
            </div>
            <div class="message-body messagesList">
                <section class="section" v-for="message in messages" :key="message.id">
                    <msg-box :message="message.text" :align="message.type"></msg-box>
                </section>
            </div>
        </article>
        <div class="control chatInput">
            <input class="input" type="text" placeholder="Text input" v-model="message" @change="sendQuery">
            <a class="button is-success" @click="sendQuery">
                <span class="icon is-small">
                    <!-- <i class="fas fa-check"></i> -->
                    Send
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import msgBox from "~/components/msgBox.vue";

export default {
    components: {
        msgBox
    },
    data() {
        return {
            messages: [],
            message: ''
        };
    },
    methods: {
        async sendQuery({type, target}) {
            this.messages.push({
                text: this.message,
                type: 'right'
            });
            const response = await this.$axios.$post('/handlers/message', {
                sessionId: this.$store.state.sessionId,
                query: this.message
            });
            this.message = '';
            console.log(response);
            this.messages.push({
                text: response.text,
                type: 'left'
            });
        }
    }
};
</script>

<style lang="scss">
    .messagesList {
        height: 82vh;
        overflow: scroll;
        margin-bottom: 5px;
        overflow-x: hidden;
    }

    .withImg{
        img{
            width: 5%;
        }
    }

    .chatInput {
        position: absolute;
        bottom: 0;
        min-width: 50%;

        .input {
            width: 80%;
            margin-right: 10px;
        }
        .button {
            width: 15%;
        }
    }
</style>

<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Avatar</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" type="url" placeholder="Avatar Icon URL" 
                        :value="$store.state.avatarIcon" @change="updateAvatar">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Name</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" placeholder="Bot Name" 
                        :value="$store.state.name" @change="updateName">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Header</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" placeholder="Header Color" 
                        :value="$store.state.headerColor" @change="updateHeaderColor">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Bot</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" placeholder="Bot Message Color" 
                        :value="$store.state.botMsgColor" @change="updateBotColor">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">User</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" placeholder="User Message Color" 
                        :value="$store.state.usrMsgColor" @change="updateUserColor">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods:{
        updateAvatar( { type, target } ) {
            this.$store.commit('changeAvatar', target.value)
        },
        updateName( { type, target } ) {
            this.$store.commit('changeName', target.value)
        },
        updateHeaderColor( { type, target } ) {
            this.$store.commit('changeHeaderColor', target.value)
        },
        updateBotColor( { type, target } ) {
            this.$store.commit('changeBotColor', target.value)
        },
        updateUserColor( { type, target } ) {
            this.$store.commit('changeUsrColor', target.value)
        },
    }
};
</script>

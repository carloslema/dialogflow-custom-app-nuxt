<template>
    <div>
        <div class="columns">
            <div class="column is-narrow">
                <figure class="image is-48x48" v-if="align === 'left'">
                    <img :src="$store.state.avatarIcon">
                </figure>
            </div>
            <div class="column">
                <div class="notification bubble" 
                :class="{'left': align === 'left', 'right': align === 'right'}"
                :style="{ backgroundColor: align === 'left' ? $store.state.botMsgColor : $store.state.usrMsgColor }"
                v-html="message">                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        message: {
            type: String,
            default: ''
        },
        align: {
            type: String,
            default: 'right'
        }
    }
};
</script>

<style lang="scss">
    .left {
        float: left;
        color: #fff;
        background-color: #118fe4;
    }
    .right {
        float: right;
        background-color: #e3e3e3;
    }
    .bubble {
        width: 45%;
        border-radius: 10%;
    }
</style>

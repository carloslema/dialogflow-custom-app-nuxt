<template>
    <no-ssr>
        <a class="button is-rounded is-danger" @click="toggleRecording">
            <span class="icon is-small">
                <i class="fas fa-microphone" v-show="!recording"></i>
                <i class="fas fa-microphone-slash" v-show="recording"></i>
            </span>
        </a>
    </no-ssr>
</template>

<script>
var audio_context;
var recorder;

export default {
    data(){
        return {
            result: false,
            recording: false,
            data: {
                "audio": {
                    "content": null
                },
                "config": {
                    "encoding": "LINEAR16",
                    "sampleRateHertz": 48000,
                    "languageCode": process.env.BOT_LANGUAGE || 'es'
                }
            }
        }
    },
    methods:{
        startUserMedia(stream) {
            const input = this.audio_context.createMediaStreamSource(stream);
            // Media stream created
            this.recorder = new Recorder(input);
            // Recorder initialised
        },
        toggleRecording() {
            if(!this.recording){
                this.recorder && this.recorder.record();
                this.result = false;
                this.recording = true;
            }
            else {
                this.recorder && this.recorder.stop();
                this.recording = false;
                this.processRecording();
                this.recorder.clear();
            }
        },
        processRecording() {
            const vm = this;
    
            this.recorder && this.recorder.exportWAV(function(blob) {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const baseData = reader.result;
                    const base64Data = baseData.replace("data:audio/wav;base64,", "");
                    vm.data.audio.content = base64Data;
                    vm.$axios.$post(
                    `https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBc5Utbfnp10qVwUfu633nODylekvtpIos`,
                    vm.data).then(response => {
                        const result = response.results[0].alternatives[0];
                        const textResult = result.transcript
                        vm.$store.state.messages.push({
                            text: textResult,
                            type: 'right'
                        });
                        vm.$axios.$post('/handlers/message', {
                            sessionId: vm.$store.state.sessionId,
                            query: textResult
                        })
                        .then(message => {
                            console.log(message);
                            vm.$store.state.messages.push({
                                text: message.text,
                                type: 'left'
                            });
                        });
                    }).catch(error => {
                        console.log("ERROR:" + error);
                    })
                }
            });
        }
    },
    created() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            this.audio_context = new AudioContext;
            console.log('Audio context set up.');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
            console.log(e);
            alert('No web audio support in this browser!');
        }
        const that = this;
        navigator.getUserMedia({
            audio: true
        }, function(stream) {
            that.startUserMedia(stream)
        }, function(e) {
            console.log('No live audio input: ' + e);
        });
    }
};
</script>

<style lang="scss">
    .button {
        width: 5%;
    }
</style>


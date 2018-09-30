<template>
    <div>
        <textarea rows="10" cols="45" v-model="props.message"></textarea>
        <input value='' v-model="props.text"/>
        <button @click="sendMessage()">send</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "home",
        data() {
            return {
                props:{
                    text:'',
                    message:''
                }
            }
        },
        computed: mapState({
            socket: state => state.socketStore.socket
        }),
        beforeMount() {
            this.checkUser();
            this.getMessagesEvent();
        },
        methods:{
            checkUser: function(){
                this.socket.emit('chat checkUser');
            },
            sendMessage: function(){
                this.socket.emit('chat message',this.props.text);
                this.props.text = '';
            },
            getMessagesEvent: function(){
                this.socket.on('chat message',(msg)=>{this.props.message.length? this.props.message += '\n'+msg : this.props.message += msg});
                this.socket.on('chat checkUser',(msg)=>{if(!msg){this.$router.push('/');}});
            }
        }
    }
</script>

<style scoped>

</style>
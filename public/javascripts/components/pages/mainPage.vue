<template>
    <div>
        <input value='' v-model="props.text"/>
        <button @click="sendMessage()">send</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "mainPage",
        computed: mapState({
            socket: state => state.socketStore.socket
        }),
        data() {
            return {
                props:{
                    text:'',
                }
            }
        },
        methods:{
            sendMessage: function(){
                //TODO: need to validate this.props.text;
                this.socket.emit('chat setUser',this.props.text);
                this.socket.on('chat setUser',(msg)=>{
                    if(msg){
                        this.$router.push('home');
                        this.props.text = '';
                    }else{
                        //TODO: case error
                    }

                });

            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        beforeMount() {
            this.$root.$store.dispatch('socketStore/getSocket')
        },
    };
</script>
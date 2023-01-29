<template>
    <link rel="canonical" :href="currentUrl">
</template>

<script>
export default {
    computed:{
        currentUrl(){
            return window.location.href;
        }
    }
}
</script>
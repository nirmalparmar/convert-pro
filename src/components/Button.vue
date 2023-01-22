<template>
    <button class="btn-comp" @click="convertCsv" :style="style" :disabled="disabled" :class="[color, {disabled}]"> 
        {{ title }}
    </button>
</template>

<script>
export default {
    props:{
        title: String,
        icon:String,
        disabled:Boolean,
        color:String,
        class:String,
        style:Object
    },
    data(){
        return {
        }
    },
    methods: {
        emitEvent(type, ev){
            this.$emit(type, ev)
        }
    }
}
</script>
<template>
    <div v-html="getSvg" :style="style" class="icon"></div>
</template>
<script>
import { SVGs } from '@/svgs/svgs.js'
export default {
    name: 'SvgComponent',
    props: {
        icon: String,
        style: Object,
    },
    computed: {
        getSvg(){
            return SVGs[this.icon];
        }
    }
}
</script>

<style scoped lang="less">
 .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50px;
    max-height: 50px;
    svg{
        
    }
 }
</style>
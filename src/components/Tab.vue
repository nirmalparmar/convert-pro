<template>
    <div class="tab-container">
        <div class="tab" 
            
            v-for="(item, index) in tabItems" 
            :key="index" 
            @click="selectTab(item)"
        > 
            <div class="tab-item" :class="{active:item.value == activeTab}" > 
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        tabItems:{
            type:Array,
            default: []
        },
        activeTab:{
            type:String,
            default: ''
        },
    },
    methods:{
        selectTab(tab){
            this.$emit('activeTab', tab)
        }
    }
}
</script>
<style lang="less" scoped>
.tab-container{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    min-height: 40px;
    background: #fff;
    border-bottom: 1px solid #383838;

    .tab{
        width: fit-content;
        flex: 1;

        .tab-item{
            padding: 10px;
            text-align: center;
            height: 100%;

            &.active{
                background-color: #383838;
                color: #fff;
                font-weight: 500;
            }
        }
    }
}
</style>
<template>
    <div class="container">
        <div class="title-container">
            <div class="title"> 
                JSON Formatter
            </div>
            <div class="desc"> 
                Paste text in input area to format. 
            </div>
        </div>
        <JsonFormat/>
    </div>
</template>
<script>
import JsonFormat from '../components/JsonFormat.vue';
export default {
    components:{
        JsonFormat
    }
}
</script>
<style lang="less" scoped>
    .container{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f7f7f7;
        overflow: auto;
        color: #4a4a4a;

        .title-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;

            .title{
                font-size: 30px;
                font-weight: 300;
            }
            .desc{
                text-align: center;
            }
        }
    }
</style>
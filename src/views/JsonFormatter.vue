<template>
    <div class="sub-container">
        <div class="title-container">
            <div class="title"> 
                JSON Formatter
            </div>
            <div class="desc"> 
                Paste text in input area to format. 
            </div>
        </div>
        <JsonFormat/>
        <Footer></Footer>
    </div>
</template>
<script>
import JsonFormat from '../components/JsonFormat.vue';
import Footer from '../components/Footer.vue';
export default {
    components:{
        JsonFormat,
        Footer
    }
}
</script>
<style lang="less" scoped>
    .sub-container{
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
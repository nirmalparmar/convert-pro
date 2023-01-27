<template>
    <div class="container">
        <div class="title-container">
            <div class="title"> 
                Convert JSON To CSV
            </div>
            <div class="desc"> 
                Upload json/text file or paste text in input area and submit. 
            </div>
        </div>
        <JSONParser/>
    </div>
</template>
<script>
import JSONParser from '../components/JSONParser.vue';
export default {
    components:{
        JSONParser
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
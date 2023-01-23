<template>
    <div class="container">
        <div class="title-container">
            <div class="title"> 
                Convert CSV To JSON
            </div>
            <div class="desc"> 
                Upload csv/text file or paste text in input area and submit. 
            </div>
        </div>
        <CSVParser/>
    </div>
</template>
<script>
import CSVParser from '../components/CSVParser.vue';
export default {
    components:{
        CSVParser
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

        .title-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 15px;

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
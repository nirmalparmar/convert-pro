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
        <Footer></Footer>
    </div>
</template>
<script>
import CSVParser from '../components/CSVParser.vue';
import Footer from '../components/Footer.vue';
export default {
    components:{
        CSVParser,
        Footer
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
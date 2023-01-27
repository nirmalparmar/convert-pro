<template>
    <div class="option-container">
        <div class="input-group">
            <div class="label">Delimiter:</div>
            <input type="text" v-model="config.delimiter" placeholder="auto" @change="onChange">
            <dfn>The delimiting character. Usually comma or tab. Default is comma.</dfn>
        </div>
        <div class="input-group">
            <div class="label">Newline:</div>
            <input type="text" v-model="config.newline" placeholder="auto" @change="onChange">
            <dfn>The newline character. Usually \r\n. Default is \r\n.</dfn>
        </div>
        <div class="input-group">
            <div class="label">Quote Char:</div>
            <input type="text" v-model="config.quoteChar" placeholder='auto' @change="onChange">
            <dfn>The character used to quote fields. Usually ".</dfn>
        </div>
        <div class="input-group">
            <div class="label">Escape Char:</div>
            <input type="text" v-model="config.escapeChar" placeholder='auto' @change="onChange">
            <dfn>The Escape character. Usually ".</dfn>
        </div>
        <div class="input-group">
            <input type="checkbox" v-model="config.header" @change="onChange">
            <div class="label">Header Row</div>
            <dfn>If unchecked, omits header row. If data is an array of arrays this option is ignored.</dfn>
        </div>
        <div class="input-group">
            <input type="checkbox" v-model="config.skipEmptyLines" @change="onChange">
            <div class="label">Skip Empty Lines</div>
            <dfn>By default, empty lines are parsed; check to skip.</dfn>
        </div>
        <div class="input-group">
            <input type="checkbox" v-model="config.quotes" @change="onChange">
            <div class="label">Quotes</div>
            <dfn>Enclose all fields in quotes.</dfn>
        </div>
    </div>
</template>
<script>
import Papa from 'papaparse'
export default {
    props:{
        title:String
    },
    data(){
        return {
            config: {
                quotes: true, //or array of booleans
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ",",
                header: true,
                newline: "\r\n",
                skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
                columns: null //or array of strings
            }
        }
    },
    mounted(){
        this.$emit('configChange', this.config)
    },
    methods:{
        onChange(){
            this.$emit('configChange', this.config)
        }
    }
}
</script>

<style lang="less" scoped>
    .option-container{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .input-group{
            display: flex;
            align-items: center;
            gap: 5px;
            max-width: 200px;
            flex-wrap: wrap;
            margin-bottom: 15px;

            .label{
                font-weight: 500;
                color: rgb(74, 74, 74);
                white-space: nowrap;
            }
            input[type="text"]{
                padding: 5px;
                border-radius: 4px;
                border: 1px solid #A1A09E;
                color: #222222;
                font-family: 'Source Sans Pro', 'Helvetica Neue', sans-serif;
                width: 40px;
            }
            dfn{
                font-size: 11px;
                color: #666;
                font-style: unset;
                font-family: sans-serif;
                font-weight: 500;
            }
        }
    }

</style>
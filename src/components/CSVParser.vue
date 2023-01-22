<template>
    <div class="csv-container"> 
        <!-- <div class="container"> 
            <div class="input-area"> 
                <textarea></textarea>
            </div>
            <div class="input-container">
                <div class="btn">Import File</div>
                <div class="input"><input type="text" v-model="url" placeholder="URL"></div>
            </div>
        </div> -->
        <div class="input-container"> 
            <Tab :tabItems="tabItems" :activeTab="activeTab" @activeTab="activeTab = $event.value" />
            <div class="file-input-container" v-if="activeTab == 'file'">
                <div class="file-input">
                    <button class="btn" @click="$refs.fileInput.click()">
                        <SvgComponent icon="csvFile" />
                        Upload
                    </button>
                    <input type="file" ref="fileInput" accept=".csv,.txt" @change="handleFile($event)">
                </div>
                <div v-if="file" class="file-name"> {{ file.name }} <span class="remove" @click="removeFile">remove</span></div>
            </div>
            <div class="textarea" v-if="activeTab == 'input'"> 
                <textarea name="text" :disabled="disableTextArea" v-model="csvString"></textarea>
            </div>
            <div class="options">
                <div class="option-title">Parser Setting</div>
                <input type="checkbox" v-model="headerRow"> Header Row
            </div>
            <div class="btn-container">
                <button class="btn" @click="convertCsv" :disabled="!file && !csvString.length" :class="{disabled: !file && !csvString.length}"> Convert </button>
            </div>
        </div>
    </div>
</template>

<script>
import pParser from 'papaparse'
import SvgComponent from './SvgComponent.vue';
import Tab from './Tab.vue';
let config = {
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: false,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	downloadRequestHeaders: undefined,
	downloadRequestBody: undefined,
	skipEmptyLines: false,
	chunk: undefined,
	chunkSize: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	// delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
}

export default {
    components:{
        SvgComponent,
        Tab
    },
    data(){
        return{
            file:undefined,
            csvString:'',
            disableTextArea: false,
            activeTab: 'input',
            headerRow: true,
            fileText: '',
            tabItems:[
                {
                    name:'Text Input',
                    value: 'input'
                },
                {
                    name:'File Input',
                    value: 'file'
                },
                {
                    name:'URL',
                    value: 'url'
                }
            ]
        }
    },
    mounted(){
    },
    methods:{
        handleFile(ev){
            this.file = ev.target.files[0]
            let fr = new FileReader();
            fr.onload = () => {
                this.fileText = fr.result;
            }
            fr.readAsText(this.file)
            this.disableTextArea = true
        },
        removeFile(){
            this.file = undefined
            this.disableTextArea = false
        },
        // readTextFile(file){
        //     let fr = new FileReader();
        //     fr.onload = () => {
        //         this.csvString = fr.result;
        //     }
        //     fr.readAsText(file)
        // },
        download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        
        convertCsv(){
            if(this.activeTab == 'file'){
                pParser.parse(this.file, {
                    header: this.headerRow, 
                    complete: (data) => { this.download('parsed_csv.json', JSON.stringify(data)) },
                    worker: true
                })
            } else if(this.activeTab == 'input'){
                let parsedStr = pParser.parse(this.csvString, {header: this.headerRow})
                this.download('parsed_csv.json', JSON.stringify(parsedStr))
            }
        }
    }
    
}
</script>

<style lang="less" scoped>
.csv-container{
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    margin: 0 auto;

    // .container{
    //     width: 50%;
    //     display: flex;
    //     flex-direction: column;
    //     background: #3f51b5;
    //     color: #fff;
    //     border-radius: 4px;

    //     .input-area{
    //         width: 100%;
    //         border-radius: inherit;

    //         textarea{
    //             width: 100%;
    //             border: none;
    //             outline: none;
    //             color: #fff;
    //             height: 300px;
    //             resize: none;
    //             background: #3f51b5;
    //         }
    //     }
    //     .input-container{
    //         display: flex;
    //         box-shadow: inset 0px 6px 6px -6px rgb(0 0 0 / 50%), 0px 3px 0 0 #2e4765;
    //         .btn{
    //             width: fit-content;
    //             white-space: nowrap;
    //             padding: 10px;
    //             font-weight: 600;
    //         }

    //         .input{
    //             width: 100%;

    //             input{
    //                 width: 100%;
    //                 padding: 10px;
    //                 background: transparent;
    //                 color: #fff;
    //                 border: none;
    //                 outline: none;
    //             }
    //         }
    //     }
    // }

    .input-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        .file-input-container{
            display: flex;
            align-items: center;
            gap: 10px;
            .file-input{
                display: flex;
                align-items: center;
                justify-content: center;
                .btn{
                    background: #3f51b5;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #fff;
                    padding: 10px;
                    border: none;
                    outline: none;
                    font-weight: 600;
                    border-radius: 6px;
                    cursor: pointer;
                }
                input{
                    width: 0;
                    height: 0;
                    visibility: hidden;
                    display: none;
                }
            }

            .file-name{
                display: flex;
                align-items: center;
                gap: 10px;
                color: #3f51b5;

                .remove{
                    font-weight: 600;
                    text-decoration: underline;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }

        .textarea{
            width: 100%;
            height: 220px;

            textarea{
                width: 100%;
                height: 100%;
                resize: none;
                padding: 5px;
            }
        }
        .btn-container{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            .btn{
                padding: 10px;
                background: #3f51b5;
                font-weight: 500;
                border: none;
                border-radius: 4px;
                color: #fff;
                cursor: pointer;
            }
        }
        .option-title{
            padding: 10px;
            font-weight: 600;
        }
    }
}
</style>
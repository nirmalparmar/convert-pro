<template>
    <div class="csv-container"> 
        <div class="input-container"> 
            <Tab :tabItems="tabItems" :activeTab="activeTab" @activeTab="activeTab = $event.value" />
            <div class="file-input-container" v-if="activeTab == 'file'">
                <div class="file-input">
                    <button class="btn" @click="$refs.fileInput.click()">
                        Upload
                    </button>
                    <input type="file" ref="fileInput" accept=".csv,.txt,.tsv" @change="handleFile($event)">
                </div>
                <div v-if="file" class="file-name"> {{ file.name }} <span class="remove" @click="removeFile">remove</span></div>
            </div>
            <div class="textarea" v-if="activeTab == 'input'"> 
                <!-- <JsonEditor mode="code" v-model="csvString"></JsonEditor> -->
                <Editor v-model="csvString" ></Editor>
                <!-- <textarea name="text" :disabled="disableTextArea" v-model="csvString"></textarea> -->
            </div>
            <div class="url-cont" v-if="activeTab == 'url'"> 
                <div class="url-input">
                    <div class="url-icon"><SvgComponent icon="link" /></div>
                    <input type="url" v-model="fileUrl" placeholder="Paste Url">
                </div>
            </div>
            <div class="btn-container">
                <button class="btn" @click="convertCsv" :disabled="!file && !csvString.length" :class="{disabled: !file && !csvString.length}">
                    <SvgComponent icon="right"></SvgComponent> Convert 
                </button>
            </div>
            <div class="options">
                <div class="option-title">Parser Setting</div>
                <Options @configChange="onConfigChange($event)"/>
            </div>
        </div>
        <div class="output-container"> 
            <div class="text-container">
                <JsonEditor mode="code" type="text" v-model="outputText" :readOnly="true"></JsonEditor>
                <!-- <textarea v-model="outputText"></textarea> -->
            </div>
            <div class="error" v-if="errorMessage.length"> {{ errorMessage }} </div>
            <div class="save-container">
                Save as: <input v-model="filename" type="text" placeholder="example.json/example.txt"> 
                <button class="btn" @click="downloadFile">Save</button>
                <div v-if="downloadwip">Processing please wait...</div>
            </div>
        </div>
    </div>
</template>

<script>
import pParser from 'papaparse'
import SvgComponent from './SvgComponent.vue';
import Tab from './Tab.vue';
import Options from './Options.vue';
import JsonEditor from './JsonEditor.vue';
import Editor from './Editor.vue';
// let config = {
// 	delimiter: "",	// auto-detect
// 	newline: "",	// auto-detect
// 	quoteChar: '"',
// 	escapeChar: '"',
// 	header: false,
// 	transformHeader: undefined,
// 	dynamicTyping: false,
// 	preview: 0,
// 	encoding: "",
// 	worker: false,
// 	comments: false,
// 	step: undefined,
// 	complete: undefined,
// 	error: undefined,
// 	download: false,
// 	downloadRequestHeaders: undefined,
// 	downloadRequestBody: undefined,
// 	skipEmptyLines: false,
// 	chunk: undefined,
// 	chunkSize: undefined,
// 	fastMode: undefined,
// 	beforeFirstChunk: undefined,
// 	withCredentials: undefined,
// 	transform: undefined,
// 	// delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
// }

export default {
    components:{
        SvgComponent,
        Tab,
        Options,
        JsonEditor,
        Editor
    },
    data(){
        return{
            file:undefined,
            csvString:'',
            fileUrl:'',
            disableTextArea: false,
            activeTab: 'input',
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
            ],
            config:{},
            parsedData:[],
            errorMessage: '',
            filename:'',
            outputText:[],
            downloadwip:false
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
        downloadFile(){
            if(this.filename.trim().length){
                if(this.parsedData && typeof this.parsedData == 'string'){
                    this.download(this.filename, this.parsedData)
                }else if(this.parsedData){
                    this.download(this.filename, JSON.stringify(this.parsedData))
                }
            }
        },
        download(filename, text) {
            this.downloadwip = true
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            this.downloadwip = false
        },
        
        onParseComplete(data){
            if(data.length > 100){
                this.outputText = data.splice(0,100)
                this.errorMessage = 'Parsed data is too large to display. Displaying only first 100 rows, download file to view all.'
            } else {
                this.outputText = data
            }
            this.parsedData = data
        },

        convertCsv(){
            if(this.activeTab == 'file'){
                pParser.parse(this.file, {
                    ...this.config,
                    complete: (data) => { this.onParseComplete(data.data) },
                    worker: true
                })
            } else if(this.activeTab == 'input'){
                pParser.parse(this.csvString, 
                    {
                        ...this.config,
                        complete: (data) => { this.onParseComplete(data.data) },
                    }
                )
            } else if(this.activeTab == 'url' && this.fileUrl.trim().length) {
                pParser.parse(this.fileUrl, {
                    download:true,
                    ...this.config,
                    complete: (data) => { this.onParseComplete(data.data) },
                })
            }
        },
        onConfigChange(config){
            this.config = config
        }
    }
    
}
</script>

<style lang="less" scoped>
.csv-container{
    display: flex;
    width: 85%;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;

    .input-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 47%;
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
                    font-weight: 500;
                    border-radius: 4px;
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
            min-height: 350px;
            display: flex;
            flex-direction: column;
        }
        .url-input{
            display: flex;
            // padding: 5px;
            border-radius: 5px;
            width: fit-content;
            border: 1px solid #00000057;
            .url-icon{
                padding: 8px 15px;
                background: #00000057;
                border-radius: 4px 0 0 4px;
            }
            input{
                border: none;
                outline: none;
                width: 180px;
                padding: 5px;
                height: 36px;
                border-radius: 0 5px 5px 0;
            }
        }
        .btn-container{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            // .btn{
            //     padding: 10px 15px;
            //     background: #0C0ADB;
            //     font-weight: 500;
            //     border: none;
            //     border-radius: 4px;
            //     color: #fff;
            //     cursor: pointer;
            //     display: inline-flex;
            //     align-items: center;

            //     &:hover{
            //         background: #0a08f0;
            //     }
            // }
        }

        .options{
            padding-bottom: 20px;
            
            .option-title{
                padding: 15px 0;
                font-weight: 600;
            }
        }
    }
    .output-container{
        width: 50%;
        margin-top: 50px;

        .text-container{
            height: 450px;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 0 24px #00000012;
            border-radius: 6px;
            font-weight: 500;
            color: #4b5358;
            outline: none;
        
            textarea {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                resize: none;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: 500;
                color: #4b5358;
                font-size: 16px;
                border-radius: inherit;
                padding: 10px;
            }
        }
        // .btn{
        //     padding: 10px 15px;
        //     background: #0C0ADB;
        //     font-weight: 500;
        //     border: none;
        //     border-radius: 4px;
        //     color: #fff;
        //     cursor: pointer;
        //     display: inline-flex;
        //     align-items: center;

        //     &:hover{
        //         background: #0a08f0;
        //     }
        // }
        .save-container{
            display: flex;
            gap: 5px;
            padding: 10px;
            align-items: center;

            input{
                border: none;
                border-bottom: 1px solid;
                padding: 5px;
                outline: none;
                background: transparent;
            }
        }
        .error{
            font-size: 12px;
            color: #ff2d2d;
            padding-top: 5px;
        }
    }

    @media (max-width: 1000px) {
        
        flex-wrap: wrap;
        width: 80%;
        .input-container{
            width: 100%;
        }
        .output-container{
            width: 100%;
            margin-top: 0;
        }
        
    }
}
</style>
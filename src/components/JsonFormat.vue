<template>
    <div class="csv-container"> 
        <div class="input-container"> 
            <div class="textarea" v-if="activeTab == 'input'"> 
                <JsonEditor v-model="jsonStringLeft" ref="left" :darkMode="darkMode"></JsonEditor>
            </div>
        </div>
        <div class="btn-container">
            <div> 
                <input type="checkbox" v-model="darkMode" @change="changeTheme"> Dark Mode
            </div>
            <button class="btn" @click="formatJson">
                <SvgComponent icon="right"></SvgComponent> Format 
            </button>
            <button class="btn" @click="validateJson">
             Validate 
            </button>
            <button class="btn" @click="downloadFile">
             Download 
            </button>
        </div>
        <div class="output-container"> 
            <div class="text-container">
                <JsonEditor mode="code" v-model="jsonStringRight" :readOnly="true" ref="right" :darkMode="darkMode"></JsonEditor>
            </div>
        </div>
    </div>
</template>

<script>
import SvgComponent from './SvgComponent.vue';
import JsonEditor from './JsonEditor.vue';

export default {
    components:{
        SvgComponent,
        JsonEditor
    },
    data(){
        return{
            file:undefined,
            jsonStringLeft:'',
            jsonStringRight:'',
            // fileUrl:'',
            activeTab: 'input',
            tabItems:[
                {
                    name:'Text Input',
                    value: 'input'
                },
                // {
                //     name:'File Input',
                //     value: 'file'
                // },
                // {
                //     name:'URL',
                //     value: 'url'
                // }
            ],
            errorMessage: '',
            filename:'jsonformatter.json',
            darkMode:false
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
                if(this.jsonStringRight && typeof this.jsonStringRight == 'string'){
                    this.download(this.filename, this.jsonStringRight)
                }
                else if(this.jsonStringRight){
                    this.download(this.filename, JSON.stringify(this.jsonStringRight))
                }
            }
        },
        download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        
        onParseComplete(data){
            // if(data.length > 100){
            //     this.outputText = JSON.stringify(data.splice(0,100), null, '    ')
            //     this.errorMessage = 'Parsed data is too large to display. Displaying only first 100 rows, download file to view all.'
            // } else {
            //     this.outputText = JSON.stringify(data, null, '    ')
            // }
            this.parsedData = data
        },

        validateJson(){
            // this.$refs.left.validateJson()
        },
        formatJson(){
            this.jsonStringRight = this.jsonStringLeft
            // this.$refs.right.formatJson()
        },
        onConfigChange(config){
            this.config = config
        },
        // changeTheme(){
        //     if(theme)
        // }
    }
    
}
</script>

<style lang="less" scoped>
.csv-container{
    display: flex;
    width: 95%;
    // height: 100%;
    margin: 0 auto;
    justify-content: space-between;

    .input-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 48%;
        height: 100%;
        margin-bottom: 0.2rem;
        // .file-input-container{
        //     display: flex;
        //     align-items: center;
        //     gap: 10px;
        //     .file-input{
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;
        //         .btn{
        //             background: #3f51b5;
        //             display: flex;
        //             align-items: center;
        //             gap: 10px;
        //             color: #fff;
        //             padding: 10px;
        //             border: none;
        //             outline: none;
        //             font-weight: 500;
        //             border-radius: 4px;
        //             cursor: pointer;
        //         }
        //         input{
        //             width: 0;
        //             height: 0;
        //             visibility: hidden;
        //             display: none;
        //         }
        //     }

        //     .file-name{
        //         display: flex;
        //         align-items: center;
        //         gap: 10px;
        //         color: #3f51b5;

        //         .remove{
        //             font-weight: 600;
        //             text-decoration: underline;
        //             font-size: 12px;
        //             cursor: pointer;
        //         }
        //     }
        // }

        .textarea{
            width: 100%;
            height: 650px;
            box-sizing: border-box;
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
    }
    .btn-container{
        display: flex;
        flex-direction: column;
        margin: 10px;
        gap: 10px;
        // align-items: center;
        justify-content: center;
       
        .btn{
            width: 100px;
        }
    }

    .output-container{
        width: 48%;
        height: 100%;
        display: flex;

        .text-container{
            height: 650px;
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
        
        .error{
            font-size: 12px;
            color: #ff2d2d;
            padding-top: 5px;
        }
    }

    @media (max-width: 1000px) {
        
        // flex-wrap: wrap;
        flex-direction: column;
        width: 80%;
        .input-container{
            width: 100%;
            height: fit-content;

            .textarea{
                height: 350px;
            }
        }
        .output-container{
            width: 100%;
            height: fit-content;
            .text-container{
                height: 350px;
            }
        }
        
    }
}
</style>
<template>
    <div class="jsoneditor" ref="editor"></div>
</template>

<script>
import JSONEditor from "jsoneditor";
import 'brace'
import 'brace/theme/dawn'
import 'brace/theme/dracula'

export default {
    name: "JSONEditor",
    props:{
        modelValue:[String, Object, Array, Number],
        mode:{
            type:String,
            default: 'code'
        },
        type: {
            type:String,
            default:'json'
        },
        readOnly:{
            type:Boolean,
            default: false
        },
        darkMode: {
            type: Boolean,
            default: true
        }
    },
    watch:{
        darkMode(a,b){
            a ? this.editor.aceEditor.setTheme('ace/theme/dracula')
            : this.editor.aceEditor.setTheme('ace/theme/dawn')
        }
    },
    mounted() {
        let options = {
            mode: this.mode,
            onChange: this.onChange,
            theme: this.darkMode ? 'ace/theme/dracula' : 'ace/theme/dawn'
        }
        this.editor = new JSONEditor(this.$refs["editor"], options);
        this.editor.set(this.modelValue);
        this.editor.aceEditor.setReadOnly(this.readOnly)
    },
    updated() {
        if(!this.internalChange){
            this.editor.set(this.modelValue)
        } 
        this.internalChange = false;
    },
    beforeUnmount() {
        this.editor.destroy();
        this.editor = null;
    },
    methods:{
        onChange() {
            // console.log(this.editor)
            let error = null
            let json = {}
            try {
                json = this.editor.get()
            } catch (err) {
                error = err
            }
            if (error) {
                this.$emit("error", error)
            } else {
                if (this.editor) {
                    this.internalChange = true
                    this.$emit("update:modelValue", json) 
                    this.$emit("change", json)
                }
            }
        },
        validateJson(){
            if(this.editor){
                return this.editor.validate()
            }else {
                return new Promise((resolve, reject) => {
                    reject("Editor not found")
                })
            }
        },
        formatJson(){
            this.validateJson().then(res => {
                if(res && !res.length){
                    this.editor.format()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        addRangeMarker(marker, sr, sc, er, ec){
            var Range = ace.require('ace/range').Range;
            let range = new Range(sr, sc, er,ec)
            this.editor.aceEditor.getSession().addMarker(range, marker, "text");
        },
        removeMarkers(){
            const prevMarkers = this.editor.aceEditor.getsession().getMarkers();
            if (prevMarkers) {
                const prevMarkersArr = Object.keys(prevMarkers);
                for (let item of prevMarkersArr) {
                    this.editor.aceEditor.getsession().removeMarker(prevMarkers[item].id);
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
// @import url('jsoneditor/dist/jsoneditor.css');

.jsoneditor {
    width: 100%;
    height: 100%;
    min-height: 300px;
}
</style>
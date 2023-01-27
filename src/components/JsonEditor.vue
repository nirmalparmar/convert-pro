<template>
    <div class="jsoneditor" ref="editor"></div>
</template>

<script>
import JSONEditor from "jsoneditor";
import 'brace/theme/ambiance'
import 'brace/theme/cobalt'

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
    mounted() {
        let options = {
            mode: this.mode,
            onChange: this.onChange,
            theme: this.darkMode ? 'ace/theme/ambiance' : 'ace/theme/cobalt'
        }
        this.editor = new JSONEditor(this.$refs["editor"], options);
        this.editor.set(this.modelValue);
        this.editor.aceEditor.setReadOnly(this.readOnly)
    },
    updated() {
        if(!this.internalChange){
            this.editor.set(this.modelValue)
            this.darkMode ? this.editor.aceEditor.setTheme('ace/theme/ambiance') : this.editor.aceEditor.setTheme('ace/theme/cobalt')
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
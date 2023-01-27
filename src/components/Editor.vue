<template>
    <div class="jsoneditor" ref="editor"></div>
    <div class="jsoneditor-statusbar" id="statusbar"></div>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'brace'
import 'brace/mode/text'
import 'brace/theme/ambiance'
import 'brace/ext/statusbar'

const propNames = [
  "content",
  "mode",
  "mainMenuBar",
  "navigationBar",
  "statusBar",
  "readOnly",
  "indentation",
  "tabSize",
  "escapeControlCharacters",
  "escapeUnicodeCharacters",
  "validator",
  "onError",
  "onChange",
  "onChangeMode",
  "onClassName",
  "onRenderValue",
  "onRenderMenu",
  "queryLanguages",
  "queryLanguageId",
  "onChangeQueryLanguage",
  "onFocus",
  "onBlur",
];

function pickDefinedProps(object, propNames) {
  const props = {};
  for (const propName of propNames) {
    if (object[propName] !== undefined) {
      props[propName] = object[propName];
    }
  }
  return props;
}

export default {
    name: "Editor",
    props:{
        modelValue:[String, Object, Array, Number],
        mode:{
            type:String,
            default: 'code'
        },
        type: {
            type:String,
            default:'json'
        }
    },
    mounted() {
        this.editor = ace.edit(this.$refs["editor"]);
        this.editor.getSession().setMode('ace/mode/text');
        var StatusBar =  ace.require("ace/ext/statusbar").StatusBar;
        var statusBar = new StatusBar(this.editor, document.getElementById("statusbar"));
        this.editor.setTheme('ace/theme/ambiance')
        this.editor.container.style.lineHeight = 1.7
        this.editor.renderer.updateFontSize()
        this.editor.setValue(this.modelValue);
        this.editor.getSession().on('change', this.onChange)
    },
    updated() {
        if(!this.internalChange){
            this.editor.setValue(this.modelValue)
        } 
        this.internalChange = false;
    },
    beforeUnmount() {
        this.editor.destroy();
        this.editor = null;
    },
    methods:{
        onChange(e) {
            // console.log(e,this.editor)
            let error = null
            let json = {}
            try {
                json = this.editor.getValue()
            } catch (err) {
                error = err
            }
            if (error) {
                this.$emit("error", error)
            } else {
                if (this.editor) {
                    this.internalChange = true
                    this.$emit("update:modelValue", json)    
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
// @import url('jsoneditor/dist/jsoneditor.css');

#statusbar{
    z-index: 2;
    padding: 0 0.5rem;
}
.jsoneditor {
    width: 100%;
    height: 100%;
    min-height: calc(100% - 26px);
    color: #E6E1DC;
}
</style>
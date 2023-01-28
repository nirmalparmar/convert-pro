<template>
    <div class="diff-container">
        <div class="left">
            <JsonEditor v-model="leftJson" ref="left" :darkMode="darkMode">
            </JsonEditor>
        </div>
        <div class="btn-container"> 
            <div> 
                <input type="checkbox" v-model="darkMode"> Dark Mode
            </div>
            <button class="btn" @click="compareString"> Compare </button>
            <button class="btn" @click="loadSampleData"> Sample </button>
        </div>
        <div class="right">
            <JsonEditor v-model="rightJson" ref="right" :darkMode="darkMode">
            </JsonEditor>
        </div>
    </div>
</template>

<script>
import JsonEditor from './JsonEditor.vue';
import deepDiff from 'deep-diff';
import { parse } from '../helper.js/json'
import { toRaw } from 'vue';


export default {
    components:{
        JsonEditor
    },
    data(){
        return {
            leftJson: "",
            rightJson: "",
            sampleleftJson: {"Aidan Gillen": {"array": ["Game of Thron\"es","The Wire"],"string": "some string","int": 2,"aboolean": true, "boolean": true,"object": {"foo": "bar","object1": {"new prop1": "new prop value"},"object2": {"new prop1": "new prop value"},"object3": {"new prop1": "new prop value"},"object4": {"new prop1": "new prop value"}}},"Amy Ryan": {"one": "In Treatment","two": "The Wire"},"Annie Fitzgerald": ["Big Love","True Blood"],"Anwan Glover": ["Treme","The Wire"],"Alexander Skarsgard": ["Generation Kill","True Blood"], "Clarke Peters": null},
            samplerightJson: {"Aidan Gillen": {"array": ["Game of Thrones","The Wire"],"string": "some string","int": "2","otherint": 4, "aboolean": "true", "boolean": false,"object": {"foo": "bar"}},"Amy Ryan": ["In Treatment","The Wire"],"Annie Fitzgerald": ["True Blood","Big Love","The Sopranos","Oz"],"Anwan Glover": ["Treme","The Wire"],"Alexander Skarsg?rd": ["Generation Kill","True Blood"],"Alice Farmer": ["The Corner","Oz","The Wire"]},
            diffs:[],
            DELETE_MARKER: 'delete-marker',
            REPLACE_MARKER: 'replace-marker',
            NEW_MARKER: 'new-marker',
            darkMode: true
        }
    },
    methods: {
        highlightChange(){
            let rightResult = parse(this.$refs.right.editor.getText())
            let leftResult = parse(this.$refs.left.editor.getText())
            console.log(this.$refs.left.editor)
            
            for (let d of this.diffs){
                if(d.kind == 'E'){
                    let pos = this.getPosition(rightResult.pointers, toRaw(d))
                    this.$refs.right.addRangeMarker(this.REPLACE_MARKER, pos.start.line, pos.start.ch, pos.end.line, pos.end.ch)
                }
                // if(d.kind == 'A'){
                //     let pos = this.getPosition(rightResult.pointers, toRaw(d))
                //     this.$refs.right.addRangeMarker(this.REPLACE_MARKER, pos.start.line, pos.start.ch, pos.end.line, pos.end.ch)
                // }
                if(d.kind == 'D'){
                    let pos = this.getPosition(leftResult.pointers, toRaw(d))
                    this.$refs.left.addRangeMarker(this.DELETE_MARKER, pos.start.line, pos.start.ch, pos.end.line, pos.end.ch)
                }
                if(d.kind == 'N'){
                    let pos = this.getPosition(rightResult.pointers, toRaw(d))
                    this.$refs.right.addRangeMarker(this.NEW_MARKER, pos.start.line, pos.start.ch, pos.end.line, pos.end.ch)
                }
            }
        },
        loadSampleData(){
            this.leftJson = this.sampleleftJson
            this.rightJson = this.samplerightJson
        },
        getPosition(pointers, diff){
            let path = '/' + diff.path.join('/')
            var start = {
                line: pointers[path].key ? pointers[path].key.line : pointers[path].value.line,
                ch: pointers[path].key ? pointers[path].key.column : pointers[path].value.column
            }
            var end = {
                line: pointers[path].valueEnd.line,
                ch: pointers[path].valueEnd.column
            };
            return {
                start: start,
                end: end
            }
        },
        compareString(){
            this.diffs = [...deepDiff.DeepDiff(this.leftJson, this.rightJson)]
            this.highlightChange()
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
    .diff-container{
        width: 100%;
        // height: 100%;
        display: flex;
        margin: 0 auto;
        
        .btn-container{
            display: flex;
            flex-direction: column;
            margin: 10px;
            gap: 10px;
            // align-items: center;
            justify-content: center;

            .btn {
                width: 100px;
            }
        
        }
        .left{
            width: 48%;
            height: 600px;
            margin: 0 10px;
        }
        .right{
            width: 48%;
            height: 600px;
            margin: 0 10px;
        }
    }
    @media (max-width: 1000px) {
        .diff-container{
            flex-direction: column;
            width: 90%;
            // height: fit-content;
            .left{
                width: 100%;
                height: 350px;
            }
            .right{
                width: 100%;
                height: 350px;
            }
        }
        
    }

</style>
<template>
    <div class="dropdown" tabindex="0" @blur="closeDropdown">
        <div v-if="label" class="label">{{ label }}</div>
        <div class="dropdown-select" @click="toggleDropdown">
            <div class="placeholder"> {{ selectedOption ? selectedOption : placeholder }} </div>
            <div class="select-icon"> 
                <SvgComponent :style="{'height':'15px', 'width': '15px'}" icon="down-arrow" />
            </div>
        </div>
        <div class="select-options" :class="{show:isOpen}"> 
            <div class="option" v-for="(item, index) in options" :key="index" @click="selectOption(item)"> 
                {{ item.label }}
            </div>
            <div class="error-option" v-if="!options.length">No values found</div>
        </div>
    </div>
</template>

<script>
import SvgComponent from './SvgComponent.vue'


export default {
  components: { SvgComponent },
    props: {
        placeholder: String,
        options: Array,
        selectedOption: [String, Number, Array, Object],
        label: String
    },
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        toggleDropdown(){
            this.isOpen = !this.isOpen
        },
        closeDropdown(){
            this.isOpen = false
        },
        selectOption(item){
            this.$emit('selectChange', item)
            this.closeDropdown()
        }
    }
}

</script>

<style lang="less" scoped>
    .dropdown{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        font-size: 14px;
        border-radius: 6px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;

        .label{
            font-size: 12px;
            color: #80868a;
            padding: 5px;
        }

        .dropdown-select{
            display: flex;
            padding: 10px;
            align-items: center;
            gap: 10px;
            justify-content: space-between;
            background: #e8eaed;
            border-radius: 6px;
            .placeholder{
                color: #80868a;


            }
        }
        .select-options{
            position: absolute;
            top: calc(100% + 10px);
            flex-direction: column;
            background: #fff;
            visibility: hidden;
            display: none;
            max-height: 300px;
            overflow: auto;
            box-shadow: 0px 0px 6px 4px #eeeeeec9;
            border-radius: 6px;
            padding: 0 5px;
            &.show{
                visibility: visible;
                display: flex;
                z-index: 2;
                
            }
            .option{
                white-space: nowrap;
                padding: 10px;
                min-width: 80px;
                // border-bottom: 1px solid #e8eaed;
                &:hover{
                    background: #013595;
                    color: #fff;
                }
            }
            .error-option{
                white-space: nowrap;
                padding: 10px;
                min-width: 80px;
            }
        }
    }
</style>
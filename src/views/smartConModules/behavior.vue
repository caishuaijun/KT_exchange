<template>
    <div class="behavior">
        <!-- 智能合约行为激励 -->
        <div class="head">
            <span class="title" @click="toModules">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               行为激励
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">

            </div>
            <div class="con_modules">
                <div class="btn">
                    <el-button type="primary" @click="addRow" style="float:left">
                        <img src="@/assets/images/oneButtonCoin/con_add.png" alt="">
                         新增行为
                    </el-button>

                    <el-input class="search_model"
                        placeholder="搜索"
                        v-model="search">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchBa"></i>
                    </el-input>

                    <el-button type="primary" @click="handleDownload">
                        <img src="@/assets/images/oneButtonCoin/con_download.png" alt="">
                        下载模版
                    </el-button>

                    <el-button type="primary" id="upload">
                        <span id="text">
                            <img src="@/assets/images/oneButtonCoin/con_daoru.png" alt="">
                            导入模版
                        </span>
                        <input id="file" type="file" @change="importfxx(this)"/> 
                    </el-button>

                    <el-button type="primary" @click="preview">提交</el-button>
                </div>
                <div>
                    <el-table
                        :data="behaviorData"
                        style="width: 100%"
                        height="410"
                        border
                        >
                        <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="行为"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        <!-- <template slot="header" slot-scope="scope">

                            <span>行为</span>
                            <i class="el-icon-search" @click="searchBa"></i>
                            
                        </template> -->
                        </el-table-column>
                        <el-table-column
                        prop="token_num"
                        label="发放Token数量"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="right"
                            min-width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click.native.prevent="editRow(scope.$index, behaviorData)">编辑</el-button>
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, behaviorData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- <div class="footer">
                <el-pagination
                    background
                    small
                    :page-size="20"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div> -->
            <el-dialog
                :title="dialogHeader"
                :visible.sync="centerDialogVisible"
                width="715px"
                :close-on-click-modal="false"
                center>
                <div class="con_modules con_modules_dialog">
                    <div class="con_modules_left">
                        <el-form :model="ruleForm"  ref="ruleForm" label-width="130px" label-position="top">
                            <el-form-item label="行为" prop="name">
                                <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入行为，只可以输入30个字"></el-input>
                                <div class="warn_text">
                                        <img :src="imgSrc">
                                        <span>输入内容不设字符限制，只可以输入30个字</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="发放Token数量" prop="token_num">
                                <el-input type="text" v-model="ruleForm.token_num" autocomplete="off" placeholder="必填"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" v-model="ruleForm.remark" :rows="4" placeholder="请输入备注"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRow">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog
                :title="dialogHeader"
                :visible.sync="centerDialog"
                width="1105px"
                :close-on-click-modal="false"
                center>
                    
                <k-alert></k-alert>
               
                <div class="con_modules con_modules_preview">
                    <el-table
                        :data="behaviorData"
                        style="width: 100%"
                        height="370"
                        border
                        >
                        <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="行为"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        </el-table-column>
                        <el-table-column
                        prop="token_num"
                        label="发放Token数量"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        </el-table-column>
                    </el-table>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialog = false">取 消</el-button>
                    <el-button type="primary" @click="toModules">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";
import kAlert from "@/components/orderDetails/alertCom"

export default {
    data() {
        return {
            ruleForm:{
                name:'',
                token_num:'',
                remark:''
            },

            behaviorData: [],
            centerDialogVisible: false,
            imgSrc:require('@/assets/images/icon/coins_warn.png'),
            downloadLoading:false,//是否导出
            centerDialog:false,   //预览
            behavior_id:null,//当前行为id
            dialogHeader:'新增行为',
            search:null,
        }
    },
    components:{
       kAlert
    },
    created() {
        this.behaviorList()
    },
    mounted(){

    },
    computed:{
       
    },
    methods:{
        // 搜索
        searchBa(){
            let msg = {
                user_id:this.$store.state.login.userInfo.user_id,
                scence_template_id:1,
                enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                name:this.search
            }
            buttonApi.searchbehavior({params:msg}).then((res)=>{
                this.behaviorData = []
                res.payload.forEach(item => {
                    this.behaviorData.push(this.initItem(item))
                });
                console.log('搜索==',res.payload)
            })
        },
        // 预览
        preview(){
            if(!this.behaviorData||this.behaviorData.length==0){
               return this.$confim('info','暂无数据可提交')
            }
            this.dialogHeader = '预览'
            this.centerDialog = true
        },

        // 导入
        importfxx(obj) {
            let _this = this;
            // 通过DOM取文件数据
            this.file = event.currentTarget.files[0]
            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;
            var reader = new FileReader();
            FileReader.prototype.readAsBinaryString = (f)=> {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = (e)=> {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for(var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    var XLSX = require('xlsx');
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                        type: 'base64'
                    });    
                    } else {
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                    console.log('outdata==',outdata)
                    let arr = []
                    outdata.forEach((item)=>{
                        let it = {}
                        it.name = item['行为']
                        it.token_num = item['发放Token数量']
                        it.remark = item['备注']
                        arr.push(it)
                    })
                    let msg={
                        user_id:this.$store.state.login.userInfo.user_id,
                        scence_template_id:1,
                        enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                        data:JSON.stringify(arr)
                    }
                    buttonApi.importbehavior(msg).then((res)=>{
                        this.behaviorList()
                        this.$confim('success',res.payload.msg||'导入成功')
                        console.log('数据导入==',res.payload)
                    })
                }
                reader.readAsArrayBuffer(f);
            }
            if(rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },

        // 导出
        handleDownload() {
            this.downloadLoading = true
            require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel')
                const tHeader = ['行为', '发放Token数量', '备注'];
                const filterVal = ['name', 'token_num','remark']
                const list = []
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '行为激励模版')
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        initItem(item){
            return item
        },
        // 获取列表
        behaviorList(){
            let msg = {
                user_id:this.$store.state.login.userInfo.user_id,
                scence_template_id:1,
                enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id
            }
            buttonApi.behaviorlist({params:msg}).then((res)=>{
                this.behaviorData = []
                res.payload.forEach(item => {
                    this.behaviorData.push(this.initItem(item))
                });
                console.log('获取行为激励列表==',res.payload)
            })
        },
        // 添加
        addRow(){
            this.dialogHeader = '新增行为'
            this.centerDialogVisible = true
            this.ruleForm={
                name:'',
                token_num:'',
                remark:''
            }
        },
        // 编辑
        editRow(index, rows){
            this.dialogHeader = '序号'+(index+1)
            this.behavior_id = rows[index].id,
            this.ruleForm={
                name:rows[index].name,
                token_num:rows[index].token_num,
                remark:rows[index].remark
            }
            this.centerDialogVisible = true
            console.log('编辑=',index,rows)
        },
        // 保存
        saveRow(){
            if(!this.ruleForm.name || !this.ruleForm.token_num){
                return this.$confim('info','请填写完整信息')
            }
            if(this.behavior_id){
                let msg = {
                    behavior_id:this.behavior_id,
                    name:this.ruleForm.name,
                    token_num:this.ruleForm.token_num,
                    remark:this.ruleForm.remark
                }
                buttonApi.behavioredit(msg).then((res)=>{
                    this.centerDialogVisible = false
                    if(res.payload.status==200){
                        this.centerDialogVisible = false
                        this.$confim('success',res.payload.msg||'编辑成功')
                        this.behaviorList()
                    }else{
                        this.$confim('error',res.payload.msg||'编辑失败')
                    }
                    this.behavior_id = null
                })
            }else{
                let msg = {
                    user_id:this.$store.state.login.userInfo.user_id,
                    scence_template_id:1,
                    enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                    token_num:Number(this.ruleForm.token_num),
                    name:this.ruleForm.name,
                    remark:this.ruleForm.remark
                }
                buttonApi.behavioradd(msg).then((res)=>{
                    if(res.payload.status==200){
                        this.centerDialogVisible = false
                        this.$confim('success',res.payload.msg||'添加成功')
                        this.behaviorList()
                    }else{
                        this.$confim('error',res.payload.msg||'添加失败')
                    }
                })
            }
        },
        //删除
        deleteRow(index, rows) {
            this.$confirm('确认要删除当前行为?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                buttonApi.delbehavior({params:{behavior_id:rows[index].id}}).then((res)=>{
                    console.log('删除=',res.payload)
                    if(res.payload.status==200){
                        this.$confim('success',res.payload.msg||'删除成功')
                        rows.splice(index, 1);
                    }else{
                        this.$confim('error',res.payload.msg||'删除失败')
                    }
                })
            }).catch(() => {
                this.$confim('info','已取消删除')      
            });
        },
        beforeStep(){
             this.$router.back(-1)
        },
        nextStep(){
             this.$router.back(-1)
        },
        toModules(){
            this.$router.back(-1)
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.behavior{
    display: inline-block;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    height: 100%;
    #upload { 
        display: inline-block;
        margin-left: 10px;
        position: relative; /* 保证子元素的定位 */ 
        cursor: pointer;
    } 
    #text { 
        display: inline-block; 
        width: 100%;
    } 
    #file { 
        cursor: pointer;
        display: block; 
        position: absolute; 
        top: -2px; 
        left: -2px; 
        width: 140px; /* 宽高和外围元素保持一致 */ 
        height: 40px; 
        opacity: 0; 
        -moz-opacity: 0; /* 兼容老式浏览器 */ 
        filter: alpha(opacity=0); /* 兼容IE */ 
    } 
    .head{
        display: inline-block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: $backGroup;
        margin: 20px 0 10px;
        font-size: 24px;
        text-align: left;
        .title{
            margin-left:  30px;
            color:$fontFFF;
            cursor: pointer;
        }
    }
    .content{
        display:inline-block;
        width: 100%;
        height: calc(100% - 102px);
        background: $backGroup;
        .dialog_warn{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: transparent;
            z-index: 9999;
        }
        .footer{
            padding: 10px 30px;
            text-align: right;
        }
         .con_modules{
            display:inline-block;
            width: 100%;
            padding: 0 30px;
            height: calc(100% - 110px);
            min-height: 400px;
            overflow: scroll;
            text-align: left;
            .search_model{
                width: 140px;
                float: left;
                margin-left: 15px;
            }
            .btn{
                text-align: right;
                margin: 10px 0 20px;
                img{
                    vertical-align: bottom;
                }
            }
            .likeBtn{
                cursor: pointer;
                color:$fontBlue;
                margin-left: 5px;
            }
            .con_modules_left{
                display:inline-block;
                width: 600px;
            }
            .warn_text{
                    display: inline-block;
                    width: 100%;
                    height: 20px;
                    text-align: left;
                    font-size:12px;
                    padding-top: 3px;
                    img{
                        vertical-align: text-top;
                    }
                    span{
                        color: $fontA2A2A2;
                    }
                }
        }
        .con_modules_dialog{
            min-height: 360px;
        }
        .con_modules_preview{
            min-height: 360px;  
            padding: 0;
        }
        .c_title{
            display:inline-block;
            width: 100%;
            height: 46px;
            line-height: 46px;
            font-size: 18px;
            padding: 0 30px;
            text-align: left;
            color:$fontFFF;
        }
    }
}


</style>
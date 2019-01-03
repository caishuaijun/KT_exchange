<template>
    <div class="welfare">
        <!-- 智能合约福利兑换 -->
        <div class="head">
            <span class="title" @click="toModules">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               福利兑换
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">

            </div>
            <div class="con_modules">
                <div class="btn">
                    <el-button type="primary" @click="addRow" style="float:left">
                        <img src="@/assets/images/oneButtonCoin/con_add.png" alt="">
                         新增
                    </el-button>
                    <el-button type="primary" @click="handleDownload">
                        <img src="@/assets/images/oneButtonCoin/con_download.png" alt="">
                        下载模版
                    </el-button>
                    <el-button type="primary" >
                        <img src="@/assets/images/oneButtonCoin/con_daoru.png" alt="">
                        导入模版
                    </el-button>
                    <el-button type="primary" @click="preview">提交</el-button>
                </div>
                <div>
                    <el-table
                        :data="welfareData"
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
                        prop="welfare"
                        label="兑换内容"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="vol"
                        label="发放Token数量"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="remarks"
                        label="备注"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="right"
                            min-width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click.native.prevent="editRow(scope.$index, welfareData)">编辑</el-button>
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, welfareData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="footer">
                    <el-pagination
                        background
                        small
                        :page-size="20"
                        :pager-count="11"
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
            <el-dialog
                :title="dialogHeader"
                :visible.sync="centerDialogVisible"
                width="715px"
                center>
                <div class="con_modules con_modules_dialog">
                    <div class="con_modules_left">
                        <el-form :model="ruleForm"  ref="ruleForm" label-width="130px" label-position="top">
                            <el-form-item label="兑换内容" prop="welfare">
                                <el-input type="text" v-model="ruleForm.welfare" autocomplete="off" placeholder="请输入兑换内容"></el-input>
                                
                            </el-form-item>
                            <el-form-item label="抵扣Token数量" prop="vol">
                                <el-input type="text" v-model="ruleForm.vol" autocomplete="off" placeholder="请输入Token数量"></el-input>
                                <div class="warn_text">
                                        <img :src="imgSrc">
                                        <span>如果是单位抵扣token数量，按照最小单位抵扣，比如请假按照小时抵扣</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="备注" prop="remarks">
                                <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"></el-input>
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
                border
                center>
                <div class="con_modules con_modules_preview">
                    <el-table
                        :data="welfareData"
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
                        prop="welfare"
                        label="兑换内容"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="vol"
                        label="抵扣Token数量"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="remarks"
                        label="备注"
                        min-width="180">
                        </el-table-column>
                    </el-table>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialog = false">取 消</el-button>
                    <el-button type="primary" @click="saveRow">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>

import utils from "@/util/util";

export default {
    data() {
        return {
            ruleForm:{
                welfare:'',
                vol:'',
                remarks:''
            },
            welfareData: [{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                }, {
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                }, {
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                }, {
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
                },{
                welfare: '王小虎',
                vol: '10000000',
                remarks: '上海市普陀区金沙江路',
            }],
            centerDialogVisible: false,
            imgSrc:require('@/assets/images/icon/coins_warn.png'),
            downloadLoading:false,//是否导出
            centerDialog:false,   //预览
            dialogHeader:'新增行为',
        }
    },
    components:{
       
    },
    created() {

    },
    mounted(){

    },
    computed:{
       
    },
    methods:{
        preview(){
            this.dialogHeader = '预览'
            this.centerDialog = true
        },
        handleDownload() {
            this.downloadLoading = true
            require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel')
                const tHeader = ['兑换内容', '抵扣Token数量', '备注'];
                const filterVal = ['welfare', 'vol','remarks']
                const list = []
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '福利兑换表')
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 添加
        addRow(){
            this.dialogHeader = '新增'
            this.centerDialogVisible = true
            this.ruleForm={
                welfare:'',
                vol:'',
                remarks:''
            }
        },
        // 编辑
        editRow(index, rows){
            this.ruleForm={
                welfare:rows[index].welfare,
                vol:rows[index].vol,
                remarks:rows[index].remarks
            }
            this.centerDialogVisible = true
            console.log('编辑=',index,rows)
        },
        // 保存
        saveRow(){
            this.centerDialogVisible = false
        },
        //删除
        deleteRow(index, rows) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                rows.splice(index, 1);
                this.$confim('success','删除成功')
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

.welfare{
    display: inline-block;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    height: 100%;
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
        .footer{
            padding: 0 30px;
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
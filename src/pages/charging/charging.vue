<template>
  <div id="app-charging">
    <el-row>
      <el-col :span="4" :offset="10">
        <el-select v-model="value8" filterable placeholder="请选择物品类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="app-charging-table">
      <el-col :span="12" :offset="6">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="length"
            label="时长/分钟"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cost"
            label="费用/分钟">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElRow
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '类别一'
        }, {
          value: '选项2',
          label: '类别二'
        }, {
          value: '选项3',
          label: '类别三'
        }, {
          value: '选项4',
          label: '类别四'
        }, {
          value: '选项5',
          label: '类别五'
        }],
        value8: '',
        tableData: [{
          name: '阶段一',
          length: '',
          cost: '',
        }, {
          name: '阶段二',
          length: '',
          cost: '',
        }, {
          name: '阶段三',
          length: '',
          cost: '',
        }, {
          name: '阶段四',
          length: '',
          cost: '',
        }]
      }
    }
  }
</script>
<style lang="less">
  @import "./charging.less";
</style>
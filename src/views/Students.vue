<template>
  <div>
    <el-button type="primary" @click="addStudent">新增</el-button>
    <el-table :data="dataList" border>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.sex===0">女</div>
          <div v-else>男</div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="birth" label="生日" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteData(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="title">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.birth" placeholder="XXXX-XX-XX"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" :label="0">女</el-radio>
          <el-radio v-model="form.sex" :label="1">男</el-radio>
        </el-form-item>
      </el-form>
      <el-button @click="confirm" type="primary">确认</el-button>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="pageChange"
      :size="params.limit"
    ></el-pagination>
  </div>
</template>
<script>
import {
  getStudentsList,
  createStudent,
  updateStudent,
  removeStudent
} from "../api/student";
export default {
  data() {
    return {
      id: 0,
      title: "新增",
      dataList: [],
      dialogVisible: false,
      params: {
        page: 1,
        limit: 10
      },
      form: {
        name: "",
        age: "",
        birth: "",
        sex: 0
      },
      count: 0
    };
  },
  created() {
    this._getStudentsList(this.params);
  },
  methods: {
    _getStudentsList(data) {
      getStudentsList(data).then(res => {
        console.log(res.data);
        this.dataList = res.data.data;
        this.count = res.data.count;
      });
    },
    /* 分页 */
    pageChange(page) {
      this.params.page = page;
      this._getStudentsList(this.params);
    },
    /* 新增 */
    addStudent() {
      this.title = "新增";
      this.dialogVisible = true;
      this.form = {
        name: "",
        age: "",
        birth: "",
        sex: 0
      };
    },
    confirm() {
      if (this.title === "新增") {
        createStudent(this.form).then(() => {
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.dialogVisible = false;
          this._getStudentsList(this.params);
        });
      } else {
        this.form.id = this.id;
        updateStudent(this.form).then(() => {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.dialogVisible = false;
          this._getStudentsList(this.params);
        });
      }
    },
    /* 编辑 */
    editData(row) {
      this.id = row.id;
      this.dialogVisible = true;
      this.title = "编辑";
      this.form.name = row.name;
      this.form.age = row.age;
      this.form.sex = row.sex;
      this.form.birth = row.birth;
    },
    /* 删除 */
    deleteData(row) {
        console.log(row)
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeStudent({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this._getStudentsList(this.params);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss">
</style>
<template>
  <div class="new">
    <div class="login_box">

      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/logo.png" alt="" />
      </div>

      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormrules" label-width="0px" class="login_form">
          <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="icon-mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()" round>登录</el-button>
          <el-button type="info" @click="resetLoginForm()" round>重置</el-button>

        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //登录表单的数据绑定对象
      loginForm:{
        username:'',
        password:''
      },
      //表单验证规则对象
      loginFormrules:{
        //验证用户名和密码是否合法
        username:[{ required: true, message: '请输入登录名称', trigger: 'blur' }, //blur 鼠标失去焦点时触发
                  { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}  //message 不符合的提示信息
        ],
        password:[{ required: true, message: '请输入登录密码', trigger: 'blur' },
                  { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  
  methods:{
    //重置登录表单
    resetLoginForm(){
        this.$refs.loginFormRef.resetFields();
    },
    login(){
        this.$refs.loginFormRef.validate(async valid => {
            if(!valid) return;
            const { data:res } = await this.$http.post("login",this.loginForm);
            console.log(res.meta.status);
            if(res.meta.status != 200) return this.$message.error("登录失败");
            this.$message.success("登录成功");
            //1、将登陆成功之后的token，保存到客户端的sessionStorage中
            //  1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
            //  1.2 token 只应在当前网站打开期间生效，所以将token 保存在sessionStorage中
            window.sessionStorage.setItem("token",res.data.token);
            //2.通过编程式导航跳转到后台主页，路由地址是 /home
            this.$router.push("/home");
            
        });

    }
  }
};
</script>

<style lang="less" scoped>
.new {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  //使盒子移至中间  移动父盒子一半，再移动自身一半
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%,-50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    //使盒子移至中间
    // position: absolute;
    //移动父类一半
    // left: 50%;
    //移动自身的一半
    // transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
}

.btns{
    //居右
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    // 表示想要设置的边框和内边距的值是包含在width内的
    box-sizing: border-box;

}

</style>

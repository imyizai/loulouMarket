// User.vue
<template>
  <div class="user-box">
      <div>我的</div>
      <router-link  to="/detail">跳转到详情页</router-link>
      </div>
</template>

<script>
export default { 
    name: "User", 
    method: {
        goBack() {
            this.$router.go(-1);
        },
        goTo(r) {
            this.$router.push({path: r});
        },
    },
    };
</script>

<style lang="less" scoped>
</style>
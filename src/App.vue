<template>
  <div id="app">
    <div class="header-frame">
      <div class="nav">
        <div class="logo">
          <a class="titleIcon" href="javascript: alert('回到首页了')" />
        </div>
        <div class="menu-list">
          <ul>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less" scoped>
  .header-frame {
    display: block;
    .nav {
      width: 100%;
      height: 60px;
      background-color: #B3C0D1;
      .logo {
        float: left;
        width: 130px;
        font-size: 24px;
        color: #fff;
        height: 60px;
        line-height: 60px;
        text-align: center;
        .titleIcon {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: url("./assets/images/titleIcon.png");
          background-size: 60px;
        }
      }
      .menu-list {
        ul {
          li {
            height: 57px;
            line-height: 57px;
            border-bottom: 3px solid #B3C0D1;
            float: left;
            width: 120px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

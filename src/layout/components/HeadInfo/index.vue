<template>

  <div class="headBox">
    <div class="headImg" :style="{backgroundImage:'url('+avator+')'}" />
    <div class="user-info">
      <p class="info-name">{{ name }}</p>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['name', 'avator', 'token'])
  }
}
</script>

<style lang="scss">
.headBox{
    height:100px;
    position:relative;
    div.headImg{
        height:80px;
        width:80px;
        background-color:aqua;
        position:absolute;
        top:10px;
        left:40px;
        background-repeat:no-repeat;
        background-size:cover;
    }
    div.user-info{
        width: 50%;
        height: 100%;
        padding: 20px 10px;
        position:absolute;
        top:0;
        left:140px;
        p{
            padding: 0 0;
            margin: 10px 0;
        }
        p.info-name {
            font-size:20px;
            font-weight: 500;
        }
        p.info-phone{
            font-size:15px;
            font-weight: 500;
        }
    }

}
</style>

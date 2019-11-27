<template>
  <div class="add-icon-wrap" @click="onClick">
    <i class="el-icon-plus icon" />
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style>

</style>

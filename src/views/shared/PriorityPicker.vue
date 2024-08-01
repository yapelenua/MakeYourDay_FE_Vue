<template>
  <ElOption
    v-for="(priority,index) in priorities"
    :key="index"
    :label="priority"
    :value="priority"
  />
</template>

<script lang="ts" setup>

const priorities = ['Low', 'Medium', 'High']

</script>

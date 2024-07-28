<template>
  <ElOption
    v-for="(label, index) in priorities.labels"
    :key="index"
    :label="label"
    :value="priorities.values[index]"
  />
</template>

<script lang="ts" setup>

const priorities = {
  labels: ['Low', 'Medium', 'High'],
  values: ['Low', 'Medium', 'High']
}

</script>

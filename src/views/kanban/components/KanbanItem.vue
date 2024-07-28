<template>
  <ElCard
    v-for="kanban in user.kanbans"
    :key="kanban.id"
    class="w-[200px] relative bg-white flex flex-col items-center p-4 shadow-md rounded-lg cursor-pointer"
    @click.stop="emitNavigateToKanban(kanban.id)"
  >
    <el-icon
      class="absolute top-2 right-2"
      @click.stop="emitDeleteKanban(kanban.id)"
    >
      <Delete />
    </el-icon>
    <p class="font-bold truncate w-full" :title="kanban.name">
      {{ kanban.name }}
    </p>
  </ElCard>
</template>
<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'

const { user } = useGeneral()

const emit = defineEmits(['navigateToKanban', 'deleteKanban'])

const emitNavigateToKanban = (kanbanId: string) => {
  emit('navigateToKanban', kanbanId)
}

const emitDeleteKanban = (kanbanId: string) => {
  emit('deleteKanban', kanbanId)
}
</script>

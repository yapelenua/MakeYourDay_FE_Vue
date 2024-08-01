<template>
  <ElCard
    v-for="kanban in user.kanbans"
    :key="kanban.id"
    class="w-[200px] bg-white flex flex-col shadow-md rounded-lg cursor-pointer"
    @click.stop="emitNavigateToKanban(kanban.id)"
  >
    <p class="truncate-multiline font-bold mb-[8px]" :title="kanban.name">
      {{ kanban.name }}
    </p>
    <el-icon
      class="self-end cursor-pointer text-gray-500 hover:text-red-500"
      @click.stop="emitDeleteKanban(kanban.id)"
    >
      <Delete />
    </el-icon>
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

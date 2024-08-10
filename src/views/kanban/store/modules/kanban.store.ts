/* eslint-disable max-len */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { v4 as uuidv4 } from 'uuid'
import type { IColumn, IEventToTask, ITask } from '../../types/kanban.types'
import { format } from 'date-fns'

export const useKanbanStore = defineStore('kanbanStore', () => {
  const { user } = useGeneral()
  const { addingToSupabase } = useGalery()
  const kanbanId = ref('')

  const dialogVisible = ref(false)
  const taskDialogVisible = ref(false)
  const selectedTask = ref<ITask>()
  const cards = ref<ITask[]>([])
  const isEditing = ref(false)
  const isAddedFromGalery = ref(false)
  const originalTask = ref<ITask>()
  const columnStatuses: string[] = ['New', 'To Do', 'In Progress', 'Done']
  const columns = ref<Record<string, IColumn>>({})
  const galeryPrewievDialog = ref(false)
  const kanbanForm = ref<ITask>({
    id: '',
    title: '',
    description: '',
    deadline: '',
    priority: '',
    status: 'New',
    order: 0,
    image: {
      id: '',
      src: ''
    }
  })

  const initializeColumns = () => {
    columnStatuses.forEach(status => {
      columns.value[status] = { tasks: [] }
    })
  }

  const fetchKanbanData = async (id: string) => {
    initializeColumns()
    try {
      const userId = user.value?.id
      if (!userId) {
        throw new Error('User ID is not available')
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('kanbans')
        .eq('id', userId)
        .single()

      if (error) throw error

      if (data && data.kanbans) {
        const kanban = data.kanbans.find((k: ITask) => k.id === id)
        if (kanban) {
          cards.value = kanban.data
          cards.value.forEach((card: ITask) => {
            if (columns.value[card.status]) {
              columns.value[card.status].tasks.push(card)
            }
          })
          sortTasksByOrder()
        } else {
          console.error('Kanban not found')
        }
      }
    } catch (error) {
      console.error('Error fetching kanban data:', error)
    }
  }

  const sortTasksByOrder = () => {
    columnStatuses.forEach(status => {
      columns.value[status].tasks.sort((a, b) => a.order - b.order)
    })
  }

  const updateCardOrderInSupabase = async (kanban: ITask) => {
    try {
      const userId = user.value?.id

      if (!userId) {
        throw new Error('User ID is not available')
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          kanbans: kanban
        })
        .eq('id', userId)

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error updating card order in Supabase:', error)
    }
  }

  const updateOrdersAndSync = async (newStatus: string) => {
    columns.value[newStatus].tasks.forEach((task, index) => {
      task.order = index
    })

    const userId = user.value?.id
    if (!userId) {
      throw new Error('User ID is not available')
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('kanbans')
      .eq('id', userId)
      .single()

    if (error) throw error

    if (data && data.kanbans) {
      const kanbanIndex = data.kanbans.findIndex((k: ITask) => k.id === kanbanId.value)
      data.kanbans[kanbanIndex].data = cards.value
      await updateCardOrderInSupabase(data.kanbans)
    }
  }

  const addTask = async (item: IEventToTask) => {
    if (item.kanbanRelateId) {
      handleEventToTask(item)
    }
    const newTask: ITask = {
      id: uuidv4(),
      title: kanbanForm.value.title,
      description: kanbanForm.value.description,
      deadline: format(new Date(kanbanForm.value.deadline), 'yyyy-MM-dd'),
      priority: kanbanForm.value.priority,
      status: 'New',
      order: 0,
      image: kanbanForm.value.image
    }

    cards.value.push(newTask)
    columns.value.New.tasks.push(newTask)

    const userId = user.value?.id
    if (!userId) {
      throw new Error('User ID is not available')
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('kanbans')
      .eq('id', userId)
      .single()

    if (error) throw error

    if (data && data.kanbans) {
      const kanbanIndex = data.kanbans.findIndex((k: ITask) => k.id === kanbanId.value)
      data.kanbans[kanbanIndex].data = cards.value
      await updateCardOrderInSupabase(data.kanbans)
    }

    if (kanbanForm.value.image.src && !isAddedFromGalery.value) {
      addingToSupabase(kanbanForm.value.image)
    }

    kanbanForm.value.title = ''
    kanbanForm.value.image = { id: '', src: '' }
    kanbanForm.value.description = ''
    kanbanForm.value.priority = ''
    kanbanForm.value.deadline = ''
    kanbanForm.value.status = ''
    dialogVisible.value = false
    isAddedFromGalery.value = false
  }

  const onDragEnd = async (event: any) => {
    const { to } = event
    const newStatus = to.closest('.kanban-column').getAttribute('data-status')
    await moveCard(event.item._underlying_vm_.id, newStatus)
    await updateOrdersAndSync(newStatus)
    sortTasksByOrder()
  }

  const moveCard = async (cardId: string, newStatus: string) => {
    const card = cards.value.find(card => card.id === cardId)
    if (card) {
      card.status = newStatus
    }
  }

  const openTaskDialog = (task: ITask) => {
    selectedTask.value = { ...task }
    originalTask.value = { ...task }
    taskDialogVisible.value = true
  }

  const startEditing = () => {
    isEditing.value = true
  }

  const cancelEdit = () => {
    if (originalTask.value) {
      selectedTask.value = { ...originalTask.value }
    }
    isEditing.value = false
  }

  const saveTask = async () => {
    try {
      if (selectedTask.value && user.value) {
        selectedTask.value.deadline = format(new Date(selectedTask.value.deadline), 'yyyy-MM-dd')
        const kanbanIdValue = kanbanId.value
        const userId = user.value.id

        if (!userId || !kanbanIdValue) {
          throw new Error('User ID or Kanban ID is not available')
        }

        const taskIndex = cards.value.findIndex(task => task.id === selectedTask.value!.id)
        if (taskIndex !== -1) {
          cards.value[taskIndex] = { ...selectedTask.value }
        }

        const status = selectedTask.value.status
        const column = columns.value[status]

        const columnTaskIndex = column.tasks.findIndex(task => task.id === selectedTask.value!.id)
        if (columnTaskIndex !== -1) {
          column.tasks[columnTaskIndex] = { ...selectedTask.value }
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('kanbans')
          .eq('id', userId)
          .single()

        if (error) throw error

        if (data && data.kanbans) {
          const kanbanIndex = data.kanbans.findIndex((k: ITask) => k.id === kanbanIdValue)

          if (kanbanIndex !== -1) {
            const taskIndex = data.kanbans[kanbanIndex].data.findIndex((task: ITask) => task.id === selectedTask.value!.id)

            if (taskIndex !== -1) {
              data.kanbans[kanbanIndex].data[taskIndex] = { ...selectedTask.value }

              const { error: updateError } = await supabase
                .from('profiles')
                .update({ kanbans: data.kanbans })
                .eq('id', userId)

              if (updateError) throw updateError
            }
          }
        }

        isEditing.value = false
      }
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  const deleteTask = async (taskId: string) => {
    taskDialogVisible.value = false

    try {
      const userId = user.value?.id
      if (!userId) {
        throw new Error('User ID is not available')
      }

      const taskIndex = cards.value.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        const status = cards.value[taskIndex].status
        const column = columns.value[status]

        const columnTaskIndex = column.tasks.findIndex(task => task.id === taskId)
        if (columnTaskIndex !== -1) {
          column.tasks.splice(columnTaskIndex, 1)
        }

        cards.value.splice(taskIndex, 1)
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('kanbans')
        .eq('id', userId)
        .single()

      if (error) throw error

      if (data && data.kanbans) {
        const kanbanIndex = data.kanbans.findIndex((k: ITask) => k.id === kanbanId.value)
        if (kanbanIndex !== -1) {
          data.kanbans[kanbanIndex].data = cards.value
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              kanbans: data.kanbans
            })
            .eq('id', userId)

          if (updateError) throw updateError
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const toggleCreateTaskModal = () => {
    dialogVisible.value = !dialogVisible.value
  }

  const handleEventToTask = (item: IEventToTask) => {
    kanbanId.value = item.kanbanRelateId as string

    kanbanForm.value.title = item.title
    kanbanForm.value.description = item.description
    kanbanForm.value.priority = item.priority
    kanbanForm.value.deadline = item.date
    kanbanForm.value.status = 'New'

    console.log('jjjjjffffff', kanbanForm.value)
  }
  return {
    dialogVisible,
    taskDialogVisible,
    kanbanForm,
    addTask,
    onDragEnd,
    columns,
    openTaskDialog,
    selectedTask,
    isEditing,
    startEditing,
    cancelEdit,
    saveTask,
    galeryPrewievDialog,
    deleteTask,
    fetchKanbanData,
    toggleCreateTaskModal,
    user,
    kanbanId,
    initializeColumns,
    isAddedFromGalery
  }
})

export function useKanban () {
  const store = useKanbanStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}

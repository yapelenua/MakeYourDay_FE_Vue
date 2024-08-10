export interface ITask {
  id: string
  title: string
  description: string
  deadline: string
  status: string
  order: number
  priority: string
  image: {
    id: string
    src: string
  }
  kanbanRelateId?: string
}

export interface IColumn {
  tasks: ITask[]
}

export interface IKanban {
  id: string
  name: string
  data: []
}

export interface IEventToTask {
  id?: string
  title: string
  description: string
  deadline: string
  status: string
  order: number
  priority: string
  kanbanRelateId?: string
  date: string
  kanbanRelate?: string
}

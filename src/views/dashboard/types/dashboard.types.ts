export interface IEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  coords: { lat: number; lng: number } | null
  priority: string
}

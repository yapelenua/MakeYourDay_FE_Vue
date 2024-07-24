export interface IEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  coords: { lat: string; lng: string } | null
  priority: string
}

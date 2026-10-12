declare module "@svg-maps/nigeria" {
  export type NigeriaLocation = {
    name: string
    id: string
    path: string
  }

  export type NigeriaMap = {
    label: string
    viewBox: string
    locations: NigeriaLocation[]
  }

  const map: NigeriaMap
  export default map
}

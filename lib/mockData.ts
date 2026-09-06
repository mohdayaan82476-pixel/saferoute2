export type Screen = 'home' | 'routes' | 'live' | 'incident' | 'report'

export type RouteOption = {
  id: string
  title: string
  minutes: number
  distance: string
  safety: number
  label: string
  description: string
  detail: string
  color: 'green' | 'amber' | 'red'
}

export type Incident = {
  title: string
  subtitle: string
  severity: string
  ahead: string
  currentScore: number
  updatedScore: number
}

export const destinations = [
  { name: 'Home', meta: '742 Evergreen Terrace · 12 min walk', score: '9.8' },
  { name: 'City Center Plaza', meta: '100 Main St · 18 min walk', score: '9.4' },
  { name: 'University Campus', meta: 'North Quad Hall · 24 min walk', score: '8.9' },
]

export const routeOptions: RouteOption[] = [
  {
    id: 'optimal',
    title: 'Route 1 · Boulevard & Civic Way',
    minutes: 28,
    distance: '8.4 km',
    safety: 91,
    label: 'OPTIMAL SAFETY',
    description: '100% lit corridors, high pedestrian activity, zero incident history.',
    detail: 'Well-lit roads along major commercial streets',
    color: 'green',
  },
  {
    id: 'balanced',
    title: 'Route 2 · Central Avenue',
    minutes: 24,
    distance: '7.9 km',
    safety: 84,
    label: 'BALANCED CORRIDOR',
    description: 'Well-lit commercial avenue, moderate evening crowd flow, steady transit.',
    detail: 'Active storefronts and reliable transit',
    color: 'green',
  },
  {
    id: 'fastest',
    title: 'Route 3 · 4th St & Industrial Cut',
    minutes: 19,
    distance: '6.8 km',
    safety: 68,
    label: 'FASTEST PATH',
    description: 'Reduced lighting between 5th & 8th St, lower foot traffic after 8 PM.',
    detail: 'Dimmly lit section near Emerald Park',
    color: 'amber',
  },
]

export const incident: Incident = {
  title: 'High-risk incident detected',
  subtitle: 'This incident affects your planned route.',
  severity: 'HIGH-RISK INCIDENT AHEAD',
  ahead: '1.8 km ahead',
  currentScore: 51,
  updatedScore: 87,
}

export const reportTimeline = [
  { time: '8:24 PM', title: 'Incident Detected', detail: 'High-severity incident detected 1.8 km ahead', tone: 'red' },
  { time: '8:25 PM', title: 'Risk Recalculated', detail: 'Current route safety decreased from 89 to 51.', tone: 'amber' },
  { time: '8:25 PM', title: 'Reroute Recommended', detail: 'Significant safety improvement found via 9th Ave.', tone: 'green' },
]

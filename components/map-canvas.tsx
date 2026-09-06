'use client'

import { useEffect, useRef } from 'react'
import { Map as MapLibre, NavigationControl } from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const routeGeoJSON = {
  type: 'Feature',
  properties: {},
  geometry: { type: 'LineString', coordinates: [[-73.996, 40.735], [-73.991, 40.739], [-73.987, 40.744], [-73.979, 40.747], [-73.973, 40.752]] },
} as const

const incidentGeoJSON = {
  type: 'Feature',
  properties: {},
  geometry: { type: 'Point', coordinates: [-73.987, 40.744] },
} as const

export function MapCanvas({ incident = false, reroute = false }: { incident?: boolean; reroute?: boolean }) {
  const mapRef = useRef<Map | null>(null)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!nodeRef.current || mapRef.current) return
    const map = new MapLibre({
      container: nodeRef.current,
      center: [-73.987, 40.744],
      zoom: 13.8,
      attributionControl: false,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    })
    map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right')
    map.on('load', () => {
      map.resize()
      map.addSource('saferoute', { type: 'geojson', data: routeGeoJSON })
      map.addLayer({ id: 'saferoute-halo', type: 'line', source: 'saferoute', paint: { 'line-color': '#9bd3a8', 'line-width': 9, 'line-opacity': 0.38 } })
      map.addLayer({ id: 'saferoute-line', type: 'line', source: 'saferoute', paint: { 'line-color': reroute ? '#0f704b' : '#087f50', 'line-width': 4, 'line-dasharray': incident && !reroute ? [1, 1.4] : [1, 0] } })
      map.addSource('incident', { type: 'geojson', data: incidentGeoJSON })
      map.addLayer({ id: 'incident-point', type: 'circle', source: 'incident', paint: { 'circle-radius': incident ? 11 : 0, 'circle-color': '#d24520', 'circle-stroke-color': '#fff1db', 'circle-stroke-width': 3 } })
    })
    mapRef.current = map
    const observer = new ResizeObserver(() => map.resize())
    observer.observe(nodeRef.current)
    return () => { observer.disconnect(); map.remove(); mapRef.current = null }
  }, [incident, reroute])

  return <div ref={nodeRef} className="map-canvas" aria-label="SafeRoute map showing streets, safe corridor, and incident overlay" />
}

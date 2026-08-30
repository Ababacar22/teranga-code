import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'

const SENEGAL_CENTER = [14.45, -14.6]
const SENEGAL_BOUNDS = [
  [11.8, -18.2],
  [17.0, -10.8],
]
const FLY_TO_DURATION_S = 0.6

function cityIcon(ville, locked) {
  const html = renderToStaticMarkup(
    <div className={`leaflet-city-node ${locked ? 'leaflet-city-node--locked' : 'leaflet-city-node--active'}`}>
      <span className="leaflet-city-node__icon">{locked ? '🔒' : ville.icon}</span>
    </div>,
  )
  return L.divIcon({ html, className: 'leaflet-city-icon-wrapper', iconSize: [40, 40], iconAnchor: [20, 20] })
}

function clusterIcon(cluster) {
  const html = renderToStaticMarkup(
    <div className="leaflet-cluster-node">
      <span>{cluster.getChildCount()}</span>
    </div>,
  )
  return L.divIcon({ html, className: 'leaflet-city-icon-wrapper', iconSize: [46, 46], iconAnchor: [23, 23] })
}

function MapRefCapture({ mapRef }) {
  const map = useMap()
  useEffect(() => {
    mapRef.current = map
  }, [mapRef, map])
  return null
}

function SenegalLeafletMap({ villes, unlockInfoFor, onCityClick }) {
  const mapRef = useRef(null)

  function handleMarkerClick(ville, lat, lon) {
    const map = mapRef.current
    if (!map) {
      onCityClick(ville)
      return
    }
    // Voyage vers la ville avant de changer d'écran, plutôt qu'un cut instantané
    map.flyTo([lat, lon], 10, { duration: FLY_TO_DURATION_S })
    setTimeout(() => onCityClick(ville), FLY_TO_DURATION_S * 1000 - 50)
  }

  return (
    <div className="geo-map">
      <MapContainer
        center={SENEGAL_CENTER}
        zoom={7}
        minZoom={6}
        maxZoom={13}
        maxBounds={SENEGAL_BOUNDS}
        maxBoundsViscosity={0.8}
        className="geo-map__viewport"
        scrollWheelZoom
      >
        <MapRefCapture mapRef={mapRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          iconCreateFunction={clusterIcon}
          maxClusterRadius={44}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
        >
          {villes.map((ville) => {
            const unlockInfo = unlockInfoFor(ville)
            const locked = !unlockInfo.unlocked
            const [lon, lat] = ville.lonLat
            return (
              <Marker
                key={ville.id}
                position={[lat, lon]}
                icon={cityIcon(ville, locked)}
                eventHandlers={{ click: () => !locked && handleMarkerClick(ville, lat, lon) }}
              >
                <Tooltip direction="top" offset={[0, -20]}>
                  <strong>{ville.name}</strong>
                  <br />
                  {locked ? unlockInfo.requirement : ville.rubrique}
                </Tooltip>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default SenegalLeafletMap

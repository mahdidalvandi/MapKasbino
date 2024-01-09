import React from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function MapMarker({ lng, lat, color }) {
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    markerRef.current = new mapboxgl.Marker({ color })
      .setLngLat([lng, lat])
      .addTo(mapboxgl.Map);

    return () => markerRef.current.remove();
  }, [lng, lat, color]);

  return null;
}

export { MapMarker };

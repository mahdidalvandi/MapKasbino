import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { PopupContent } from "../popUp/popUp";

import "mapbox-gl/dist/mapbox-gl.css";

function Map({ chartOptions }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(12);
  const [selectedZone, setSelectedZone] = useState(null);
  const [nearbyPoints, setNearbyPoints] = useState([]);

  mapboxgl.accessToken =
    "pk.eyJ1IjoicXVlMzIxNiIsImEiOiJjaWhxZmMxMDUwMDBzdXhsdWh0ZDkyMzVqIn0.sz3lHuX9erctIPE2ya6eCw";

  const zones = [
    { lng: 51.3604911, lat: 35.7290896, name: "کسبینو" },
    { lng: 51.35871958615119, lat: 35.72966733845604, name: "بوستان گلبرگ" },
    { lng: 51.35990007560366, lat: 35.73018886142751, name: "کوچه آریا" },
    { lng: 51.36099051944616, lat: 35.730326880026965, name: "خیابان مطهری" },
    { lng: 51.36184977368168, lat: 35.7300645271261, name: "کوچه یاس" },
    {
      lng: 51.361580052473556,
      lat: 35.72762511256171,
      name: "دبیرستان دکتر بهشتی ",
    },
    { lng: 51.392982, lat: 35.715364, name: "دانشگاه فرهنگ و هنر" },
    { lng: 51.407658, lat: 35.713598, name: "میدان ولی عصر" },
    { lng: 51.404101, lat: 35.719225, name: "خیابان طباطبایی" },
  ];

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [zones[0].lng, zones[0].lat],
        zoom: zoom,
      });
      zones.forEach((zone) => {
        const marker = new mapboxgl.Marker({ color: "#00ff00" })
          .setLngLat([zone.lng, zone.lat])
          .addTo(map.current);

        marker.getElement().addEventListener("click", () => {
          const nearbyPointsData = findNearbyPoints(zone.lng, zone.lat);
          setNearbyPoints(nearbyPointsData);
          setSelectedZone(zone);
        });
      });
    }
  }, [zones, zoom]);

  const findNearbyPoints = (lng, lat, selectedZone) => {
    const calculateDistance = (lng1, lat1, lng2, lat2) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLng = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    };

    const nearbyPoints = zones.reduce((acc, zone) => {
      const distance = calculateDistance(zone.lng, zone.lat, lng, lat);
      if (distance <= 1 || distance <= 3) {
        acc.push({
          name: zone.name,
          distance: distance.toFixed(2),
          lat: zone.lat,
          lng: zone.lng,
        });
      }
      return acc;
    }, []);

    return nearbyPoints;
  };
  const onMapClick = (lng, lat) => {
    const updatedNearbyPoints = findNearbyPoints(lng, lat);
    setNearbyPoints(updatedNearbyPoints);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      {selectedZone && (
        <PopupContent
          initialChartOptions={chartOptions}
          chartOptions={chartOptions}
          selectedZone={selectedZone}
          nearbyPoints={nearbyPoints}
          onClose={() => setSelectedZone(null)}
          onMapClick={onMapClick}
        />
      )}
    </div>
  );
}

export default Map;

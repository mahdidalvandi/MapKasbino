import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as echarts from "echarts";

import "mapbox-gl/dist/mapbox-gl.css";

function PopupContent({ chartOptions, selectedZone, nearbyPoints, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // Initialize ECharts chart
    chartInstance.current = echarts.init(chartContainerRef.current);
    chartInstance.current.setOption(chartOptions);

    // Initialize Mapbox GL map
    mapInstance.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [selectedZone.lng, selectedZone.lat],
      zoom: 15,
    });

    // Add marker for the selected zone
    const selectedZoneMarker = new mapboxgl.Marker({ color: "#ff0000" })
      .setLngLat([selectedZone.lng, selectedZone.lat])
      .addTo(mapInstance.current);

    // Add markers for nearby points
    nearbyPoints.forEach((point) => {
      new mapboxgl.Marker({ color: "#ff8000" })
        .setLngLat([point.lng, point.lat])
        .addTo(mapInstance.current);
      console.log([point.lng, point.lat]);
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [chartOptions, selectedZone, nearbyPoints]);

  return (
    <>
      {isOpen && (
        <div className="fixed w-5/6 h-4/5 m-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-50">
          <div className="flex h-fit">
            <div className=" flex-col inline-grid h-fit text-nowrap">
              <div className=" pb-8 h-fit w-fit">
                <div
                  ref={mapContainerRef}
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <h3>
                Selected Zone:{" "}
                <p className="font-semibold text-nowrap inline-flex">
                  {selectedZone.name}
                </p>
              </h3>
              <p className="font-bold mt-3">Nearby Points:</p>
              <ul>
                {nearbyPoints.map((point, index) => (
                  <li key={index}>
                    Name: {point.name}, Distance: {point.distance} km
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-3/5 p-1 mt-12 ml-5">
              <div ref={chartContainerRef} style={{ height: "380px" }} />
            </div>
          </div>

          <button
            className="absolute top-2 right-2 bg-gray-300 px-4 py-2 rounded"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export { PopupContent };

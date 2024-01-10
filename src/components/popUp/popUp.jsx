import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as echarts from "echarts";
import "mapbox-gl/dist/mapbox-gl.css";

function PopupContent({
  initialChartOptions,
  selectedZone,
  nearbyPoints,
  onClose,
  onMapClick,
}) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  const [selectedPoint, setSelectedPoint] = useState(selectedZone);
  console.log(selectedPoint);
  useEffect(() => {
    chartInstance.current = echarts.init(chartContainerRef.current);
    chartInstance.current.setOption(chartOptions);
    mapInstance.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [selectedZone.lng, selectedZone.lat],
      zoom: 14,
    });

    const selectedZoneMarker = new mapboxgl.Marker({ color: "#ff0000" })
      .setLngLat([selectedZone.lng, selectedZone.lat])
      .addTo(mapInstance.current);

    nearbyPoints.forEach((point) => {
      const markerElement = document.createElement("div");
      new mapboxgl.Marker({ color: "#ff8000" })
        .setLngLat([point.lng, point.lat])
        .addTo(mapInstance.current);
      markerElement.addEventListener("click", () => handleMarkerClick(point));
    });

    mapInstance.current.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      onMapClick(lng, lat);
    });

    const cleanup = () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const mapContainer = mapContainerRef.current;
      if (mapContainer && mapContainer.parentNode) {
        mapInstance.current.remove();
      }
    };

    return cleanup;
  }, [chartOptions, selectedZone, nearbyPoints, onMapClick]);

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
    const selectedZoneMarker = new mapboxgl.Marker({ color: "#ff8000" })
      .setLngLat([point.lng, point.lat])
      .addTo(mapInstance.current);
    mapInstance.current.flyTo({ center: [point.lng, point.lat] });

    const newData = generateNewLineData(point);

    chartInstance.setOption({
      series: [
        {
          ...chartOptions.series[0],
          data: newData,
        },
      ],
    });
  };

  return (
    <div className="fixed w-5/6 h-4/5 m-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-50">
      <div className="flex h-fit">
        <div className="flex-col inline-grid h-fit text-nowrap">
          <div className="pb-8 h-fit w-fit">
            <div
              ref={mapContainerRef}
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <h3>
            Selected Zone
            <p className="font-semibold text-nowrap inline-flex">
              {selectedPoint.name}
            </p>
          </h3>
          <p className="font-bold mt-3 text-red-600">Nearby Points:</p>
          <ul>
            {nearbyPoints.map((point, index) => (
              <li
                key={index}
                onClick={() => handleMarkerClick(point)}
                className="flex items-center py-1 cursor-pointer transition-colors hover:bg-gray-100"
              >
                <span className="mr-2">Name: {point.name}, Distance:</span>
                <span className="font-bold text-green-700">
                  {point.distance} km
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/5 p-1 mt-12 ml-5">
          <div ref={chartContainerRef} style={{ height: "380px" }} />
          <div className="flex space-x-6 items-center justify-center mt-4 text-xl">
            <p className="font-semibold text-right text-blue-500 mb-4">
              ترافیک خیابان
            </p>
            <p className="font-semibold text-right text-green-500 mb-4">
              ترافیک اتوبان
            </p>
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 bg-gray-300 px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export { PopupContent };

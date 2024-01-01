import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import * as echarts from "echarts";

export default function Map({ chartOptions }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tehran = { lng: 51.3604911, lat: 35.7290896 };
  const tehran1 = { lng: 51.35871958615119, lat: 35.72966733845604 };
  const tehran2 = { lng: 51.35990007560366, lat: 35.73018886142751 };
  const tehran3 = { lng: 51.36099051944616, lat: 35.730326880026965 };
  const tehran4 = { lng: 51.36184977368168, lat: 35.7300645271261 };
  const tehran5 = { lng: 51.361580052473556, lat: 35.72762511256171 };
  const tehran6 = { lng: 51.357634415574, lat: 35.72584955940661 };

  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "F4DaxqdhnK0cgglri92y";

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tehran.lng, tehran.lat],
      zoom: zoom,
    });

    /* T6 */
    new maptilersdk.Marker({ color: "#00ff00" })
      .setLngLat([tehran6.lng, tehran6.lat])
      .addTo(map.current);
    /* T5 */
    new maptilersdk.Marker({ color: "#00ff00" })
      .setLngLat([tehran5.lng, tehran5.lat])
      .addTo(map.current);
    /* T4 */
    new maptilersdk.Marker({ color: "#00ff00" })
      .setLngLat([tehran4.lng, tehran4.lat])
      .addTo(map.current);
    /* T3 */
    new maptilersdk.Marker({ color: "#00ff00" })
      .setLngLat([tehran3.lng, tehran3.lat])
      .addTo(map.current);
    /* T2 */
    new maptilersdk.Marker({ color: "#00ff00" })
      .setLngLat([tehran2.lng, tehran2.lat])
      .addTo(map.current);
    /* T1  */
    const marker1 = new maptilersdk.Marker({
      color: "#FFFF00 ",
    })
      .setLngLat([tehran1.lng, tehran1.lat])
      .addTo(map.current);

    const popupContent1 = document.createElement("div");
    popupContent1.style.width = "420px";
    popupContent1.style.height = "300px";
    const chart1 = echarts.init(popupContent1);
    chart1.setOption(chartOptions);

    marker1.setPopup(new maptilersdk.Popup().setDOMContent(popupContent1));

    map.current.on("click", (e) => {
      if (e.lngLat.lng === tehran1.lng && e.lngLat.lat === tehran1.lat) {
        marker1.togglePopup();
      }
    });
    /* T */
    const marker = new maptilersdk.Marker({
      color: "#FF0000",
    })
      .setLngLat([tehran.lng, tehran.lat])
      .addTo(map.current);

    const popupContent = document.createElement("div");
    popupContent.style.width = "420px";
    popupContent.style.height = "300px";
    const chart = echarts.init(popupContent);
    chart.setOption(chartOptions);

    marker.setPopup(new maptilersdk.Popup().setDOMContent(popupContent));

    map.current.on("click", (e) => {
      if (e.lngLat.lng === tehran.lng && e.lngLat.lat === tehran.lat) {
        marker.togglePopup();
      }
    });
  }, [tehran.lng, tehran.lat, zoom, chartOptions]);

  return (
    <div id="map" className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

// import React, { useRef, useEffect, useState } from "react";
// import * as maptilersdk from "@maptiler/sdk";
// import * as echarts from "echarts";
// import "@maptiler/sdk/dist/maptiler-sdk.css";
// import "./map.css";

// export default function Map() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const tehran = { lng: 51.3604911, lat: 35.7290896 };
//   const tehran1 = { lng: 51.35871958615119, lat: 35.72966733845604 };
//   const tehran2 = { lng: 51.35990007560366, lat: 35.73018886142751 };
//   const tehran3 = { lng: 51.36099051944616, lat: 35.730326880026965 };
//   const tehran4 = { lng: 51.36184977368168, lat: 35.7300645271261 };
//   const tehran5 = { lng: 51.361580052473556, lat: 35.72762511256171 };
//   const tehran6 = { lng: 51.357634415574, lat: 35.72584955940661 };

//   const [zoom] = useState(14);

//   useEffect(() => {
//     if (map.current) return;

//     map.current = new maptilersdk.Map({
//       container: mapContainer.current,
//       style: maptilersdk.MapStyle.STREETS,
//       center: [tehran.lng, tehran.lat],
//       zoom: zoom,
//     });

//     /* T6 */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran6.lng, tehran6.lat])
//       .addTo(map.current);
//     /* T5 */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran5.lng, tehran5.lat])
//       .addTo(map.current);
//     /* T4 */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran4.lng, tehran4.lat])
//       .addTo(map.current);
//     /* T3 */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran3.lng, tehran3.lat])
//       .addTo(map.current);
//     /* T2 */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran2.lng, tehran2.lat])
//       .addTo(map.current);
//     /* T1  */
//     new maptilersdk.Marker({ color: "#00ff00" })
//       .setLngLat([tehran1.lng, tehran1.lat])
//       .addTo(map.current);

//     /* T */
//     const content =
//       '<div id="myChart" style="width:100%; height:300px;"></div>';
//     const marker = new maptilersdk.Marker({ color: "#FF0000" })
//       .setLngLat([tehran.lng, tehran.lat])
//       .addTo(map.current);
//     marker.setPopup(new maptilersdk.Popup().setHTML(content));
//     var myChart = echarts.init(document.getElementById("myChart"));
//     var chartOptions = {
//       title: {
//         text: "Tehran Chart",
//       },
//       xAxis: {
//         type: "category",
//         data: ["Category 1", "Category 2", "Category 3"],
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           name: "T",
//           type: "bar",
//           data: [10, 20, 30],
//         },
//         {
//           name: "T1",
//           type: "bar",
//           data: [15, 25, 35],
//         },
//       ],
//     };
//     myChart.setOption(chartOptions);
//   }, [tehran.lng, tehran.lat, zoom]);

//   return (
//     <div id="map" className="map-wrap">
//       <div ref={mapContainer} className="map" />
//     </div>
//   );
// }

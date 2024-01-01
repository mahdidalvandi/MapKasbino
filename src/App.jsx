import React from "react";
import Map from "./components/map/map";
import Navbar from "./components/navbar/navbar";

export default function App() {
  const chartOptions = {
    title: {
      text: "Tehran Chart",
    },
    xAxis: {
      type: "category",
      data: ["TInfo", "TInfo1", "TInfo2"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "T",
        type: "line",
        data: [10, 20, 30, 15, 45, 65, 11, 13, 14, 16],
      },
      {
        name: "T1",
        type: "line",
        data: [15, 25, 10, 45, 20, 11, 19, 6, 13, 11],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <Map chartOptions={chartOptions} />
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function PopupContent({ chartOptions, selectedZone, nearbyPoints, onClose }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    chartInstance.current = echarts.init(chartContainerRef.current);
    chartInstance.current.setOption(chartOptions);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [chartOptions]);

  return (
    <div className="fixed w-5/6 h-4/5 m-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50">
      <div className="flex">
        <div className=" flex-col inline-grid w-fit-content whitespace-nowrap">
          <p className="mb-2">Selected Zone: {selectedZone.name}</p>
          <p className="mb-3">Nearby Points:</p>
          <ul className="list-none">
            {nearbyPoints.map((point, index) => (
              <li key={index} className="mt-1">
                Name: {point.name}, Distance:{" "}
                <span className="font-bold"> {point.distance}</span> km
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
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

export default PopupContent;

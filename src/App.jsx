import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Map from "./components/map/map";

export default function App() {
  const timelineData = [
    "شنبه",
    "یکشنبه",
    "دوشنیه",
    "سه شنبه",
    "چهارشنبه",
    "شنبه 5",
    "جمعه",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleTimelineChange = (step) => {
    setCurrentStep(step);
  };

  const generateRandomDataWithNames = () => {
    const categories = [
      "TInfo",
      "TInfo1",
      "TInfo2",
      "TInfo3",
      "TInfo4",
      "TInfo5",
      "TInfo6",
    ];
    return categories.map((category) => ({
      name: category,
      value: Math.random() * 50,
    }));
  };

  const generateTrafficRateData = () => {
    const data1 = generateRandomDataWithNames();
    const data2 = generateRandomDataWithNames();
    return [data1, data2];
  };

  const [trafficRates, setTrafficRates] = useState(generateTrafficRateData());

  const chartOptions = {
    baseOption: {
      timeline: {
        axisType: "category",
        data: timelineData,
        currentIndex: currentStep,
        controlPosition: "left",
        autoPlay: false,
        playInterval: 1000,
        loop: false,
        emphasis: {
          controlStyle: {
            color: "#0078d4",
          },
        },
      },
      title: {
        text: "اطلاعات محدوده انتخاب شده",
      },
      xAxis: {
        type: "category",
        data: [
          "۰۰ - ۰۳",
          "۰۳ - ۰۵",
          "۰۵ - ۰۸",
          "۰۸ - ۱۱",
          "۱۱ - ۱۵",
          "۱۵ - ۲۰",
          "۲۰ - ۰۰",
        ],
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          const seriesName = params.seriesName;
          const dataName = params.data.name;
          const value = params.data.value;
          return ` ${value.toFixed(3)} :${seriesName}`;
        },
      },
      series: [
        {
          name: "ترافیک خیابان ها",
          type: "line",
          smooth: true,

          data: generateRandomDataWithNames(),
        },
        {
          name: "ترافیک اتوبان",
          type: "line",
          smooth: true,
          data: generateRandomDataWithNames(),
        },
      ],
    },
    options: timelineData.map(() => ({
      series: [
        {
          data: generateRandomDataWithNames(),
        },
        {
          data: generateRandomDataWithNames(),
        },
        {
          data: generateRandomDataWithNames(),
        },
      ],
    })),
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
    setTrafficRates(generateTrafficRateData());
  };

  return (
    <div>
      <Navbar />
      <Map chartOptions={chartOptions} trafficRates={trafficRates} />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => handleStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous Step
        </button>
        <span style={{ margin: "0 10px" }}>{timelineData[currentStep]}</span>
        <button
          onClick={() => handleStepChange(currentStep + 1)}
          disabled={currentStep === timelineData.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

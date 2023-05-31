import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function InformationShopPage() {
  const data = {
    labels: ["OK", "Peding"],
    datasets: [
      {
        label: "",
        data: [12, 19],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="pie">
            <Pie data={data} options={options} />;
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationShopPage;

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFindTotalProductEngineerAllQuery } from "../../app/apis/admin/statistical/statisticalApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminPage() {

    const { data: productData, isLoading: productLoading } = useFindTotalProductEngineerAllQuery();

    if (productLoading){
        return <h2>Loading...</h2>
    }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bảng Thống kê sản phẩm trong ngày",
      },
    },
  };

  console.log(productData)

  const labels = ["Tài", "Quang"];


  const ok = [17,18]
  const pending = [1,2]

  const data = {
    labels,
    datasets: [
      {
        label: "OK",
        data: ok,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Pending",
        data: pending,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <div className="chart">
            <Bar options={options} data={data} />;
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;

import React from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import chartPie from "../chartjs/chartPie";
import chartLine from "../chartjs/charLine";
import chartDoughnut from "../chartjs/chartDoughnut";
import chartBar from "../chartjs/chartBar";
import { useLazyFindTotalPriceProductFinishQuery } from "../../app/apis/admin/statistical/statisticalApi";
import { useEffect } from "react";


function InformationShopPage() {


  const [getTotalPriceFinish, { data: totalPriceFinishData, isLoading: totalPriceFinishLoading }] = useLazyFindTotalPriceProductFinishQuery();

  useEffect(() => {
    getTotalPriceFinish()
  }, [])

  if (totalPriceFinishLoading) {
    return <h2>Loading...</h2>
  }

  console.log(totalPriceFinishData)


  const labels = ["Tài", "Quang"];
  const ok = [17, 18]
  const pending = [1, 2]


  const { data: dataBar, options: optionsBar } = chartBar(labels, ok, pending);
  const { data: dataPie, options: optionsPie } = chartPie();
  const { data: dataLine, options: optionsLine } = chartLine();
  const { data: dataDoughnut } = chartDoughnut();


  const currentMonth = new Date().getMonth() + 1;
  let formattedTotal = '';

  if (currentMonth >= 1 && currentMonth <= 3) {
    formattedTotal = totalPriceFinishData?.totalQ1?.toLocaleString('vi-VN') + ' VND';
  } else if (currentMonth >= 4 && currentMonth <= 6) {
    formattedTotal = totalPriceFinishData?.totalQ2?.toLocaleString('vi-VN') + ' VND';
  } else if (currentMonth >= 7 && currentMonth <= 9) {
    formattedTotal = totalPriceFinishData?.totalQ3?.toLocaleString('vi-VN') + ' VND';
  } else if (currentMonth >= 10 && currentMonth <= 12) {
    formattedTotal = totalPriceFinishData?.totalQ4?.toLocaleString('vi-VN') + ' VND';
  }

  return (
    <>
      <div className="tk">
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-line fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Today Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalToday?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-bar fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Month Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalThisMonth?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-area fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Quarter Sale</p>
            <h6 className="mb-0">{formattedTotal}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-pie fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Year Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalThisYear?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
      </div>

      <div className="tk">
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-line fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Today Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalToday?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-bar fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Month Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalThisMonth?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-area fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Quarter Sale</p>
            <h6 className="mb-0">{formattedTotal}</h6>
          </div>
        </div>
        <div className="tk-ct d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-pie fa-3x tk-ct-icon"></i>
          <div className="ms-3 tk-ct-text">
            <p className="mb-2">Year Sale</p>
            <h6 className="mb-0">{totalPriceFinishData?.totalThisYear?.toLocaleString('vi-VN') + " VND"}</h6>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Line Chart</h6>
              <Bar options={optionsBar} data={dataBar} />;
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Line Chart</h6>
              <Line options={optionsLine} data={dataLine} />;
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Line Chart</h6>
              <Bar options={optionsBar} data={dataBar} />;
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Line Chart</h6>
              <Line options={optionsLine} data={dataLine} />;
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Pie Chart</h6>
              <div className="pie">
                <Pie data={dataPie} options={optionsPie} plugins={[ChartDataLabels]} />;
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="secondary rounded h-100 p-4">
              <h6 className="mb-4">Doughnut Chart</h6>
              <Doughnut data={dataDoughnut} />;
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default InformationShopPage;

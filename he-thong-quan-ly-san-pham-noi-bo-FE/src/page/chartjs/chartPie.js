import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController,
    LineElement,
    PointElement
} from "chart.js";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
);

const chartPie = () => {

    const data = {
        labels: ["PENDING", "OK"],
        datasets: [
          {
            label: "",
            data: [12, 19],
            backgroundColor: ["#ffc107","#0d6efd"],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        plugins: {
          tooltip: {
            enabled: true,
          },
          datalabels: {
            display: true,
            color: 'black',
            font: {
              weight: 'bold',
            },
            formatter: function(value, context) {
              return value;
            },
          },
        },
      };

      return {
        data, options
      }
  
}

export default chartPie;
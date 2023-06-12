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

const chartLine = () => {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [10, 15, 7, 12, 9],
                fill: false, // Tắt tô màu dưới đường
                borderColor: 'rgb(255, 99, 132)', // Màu viền đường
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4, // Độ cong của đường
            },
        ],
    };


    const options = {
        responsive: true, // Đáp ứng kích thước
        plugins: {
            legend: {
                display: false, // Tắt hiển thị hình chú thích
            },
        },
    };

    return {
        data, options
    }


}

export default chartLine;
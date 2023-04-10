import { useEffect, useState } from "react";
import "./ReportVacations.css";
import VacationModel from "../../../Models/VacationModel";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { vacationsStore } from "../../../Redux/VacationsState";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportVacations(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    dataService
      .getAllVacations()
      .then((responseVacations) => {
        setVacations(responseVacations);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  const chartOptions = {
    ticks: {
      beginAtZero: true,
      precision: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const chartData = {
    labels: vacations.map((vacation) => vacation.destination),
    datasets: [
      {
        label: "Followers",
        data: vacations.map((vacation) => vacation.followersCount),
        backgroundColor: "rgba(13,110,253, 0.5)",
      },
    ],
  };

  const downloadCsv = () => {
    const rows = vacations.map((vacation) => {
      return `${vacation.destination}, ${vacation.followersCount}`;
    });
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "vacations-report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="ReportVacations container">
      <h1>Vacations Report</h1>
      <Bar data={chartData} options={chartOptions} />
      <button className="btn btn-primary mt-3" onClick={downloadCsv}>
        Download CSV
      </button>
    </div>
  );
}

export default ReportVacations;

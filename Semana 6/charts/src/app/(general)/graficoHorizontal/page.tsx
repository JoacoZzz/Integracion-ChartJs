"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchPromedioValorYTotalPorLine } from '@/app/Services/Api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficoBarrasHorizontal() {
  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchPromedioValorYTotalPorLine().then((data) => {
      const labels = data.map((item: any) => item.lineCode);
      const values = data.map((item: any) => item.avg_value);

      setDataChart({
        labels,
        datasets: [
          {
            label: "Valor promedio por linecode",
            data: values,
            backgroundColor: labels.map(
              () => "#" + Math.floor(Math.random() * 16777215).toString(16)
            ),
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 700, margin: "0 auto" }}>
      <h3>Valor promedio por linecode</h3>
      <Bar
        data={dataChart}
        options={{
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            x: { title: { display: true, text: "Promedio de Value" } },
            y: { title: { display: true, text: "Líneas" } },
          },
        }}
      />
    </div>
  );
}

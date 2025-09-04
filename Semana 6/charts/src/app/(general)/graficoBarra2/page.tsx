"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchPromedioValorPorCategoria } from '@/app/Services/Api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficoBarras() {
  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchPromedioValorPorCategoria().then((data) => {
      const labels = data.map((item: any) => item.categoryName);
      const values = data.map((item: any) => item.avg_value);

      setDataChart({
        labels,
        datasets: [
          {
            label: "Valor Promedio",
            data: values,
            backgroundColor: labels.map(
              () =>
                "#" +
                Math.floor(Math.random() * 16777215).toString(16)
            ),
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 700, margin: "0 auto" }}>
      <h3>Valor Promedio de Producto por Categoria</h3>
      <Bar
        data={dataChart}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            y: {
              title: { display: true, text: "Valor promedio" },
            },
            x: {
              title: { display: true, text: "Categorías" },
            },
          },
        }}
      />
    </div>
  );
}

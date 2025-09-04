"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchProductosPorCategoria } from "@/app/Services/Api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PastelCategorias() {
  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Productos por Categoría",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchProductosPorCategoria().then((data) => {
      const labels = data.map((item: any) => item.categoryName);
      const values = data.map((item: any) => item.total_products);
      const colors = labels.map(
        () =>
          "#" +
          Math.floor(Math.random() * 16777215).toString(16) // colores aleatorios
      );

      setDataChart({
        labels,
        datasets: [
          {
            label: "Productos por Categoría",
            data: values,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 500, margin: "0 auto" }}>
      <h3>Productos por Categoría</h3>
      <Pie data={dataChart} />
    </div>
  );
}

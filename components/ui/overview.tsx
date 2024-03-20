'use client'
import { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface DataItem {
  name: string;
  total: number;
}

const data: DataItem[] = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length && label) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${data.total}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
      </div>
    );
  }
  return null;
};

const getIntroOfPage = (label: string) => {
  switch (label) {
    case "Jan":
      return "Page Jan is about men's clothing";
    case "Feb":
      return "Page Feb is about women's dress";
    case "Mar":
      return "Page Mar is about women's bag";
    case "Apr":
      return "Page Apr is about household goods";
    case "May":
      return "Page May is about food";
    case "Jun":
      return "Page Jun is about baby food";
    default:
      return "";
  }
};

export function Overview() {
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const handleBarClick = (
    data: DataItem,
    index: number,
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    setActiveBar(index);
    console.log("Bar clicked:", data);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip 
          content={<CustomTooltip />} 
          wrapperStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #ccc' , margin : '14px' , padding : '14px'}}
          cursor={{ fill: 'rgba(0, 0, 0, 0.25)' }}
        />
        <Legend wrapperStyle={{ fontSize: '14px', color: '#ffffff' }} />
        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          onClick={handleBarClick}
          onMouseOver={handleBarClick}
          onMouseOut={() => setActiveBar(null)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

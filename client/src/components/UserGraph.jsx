import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const UserGraph = ({ data, chartType, title }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#8dd1e1"];

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      {chartType === 1 && (
        <BarChart width={300} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      )}
      {chartType === 0 && (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
};

UserGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  chartType: PropTypes.oneOf([0, 1]).isRequired, // 0 = Pie, 1 = Bar
  title: PropTypes.string.isRequired,
};

export default UserGraph;

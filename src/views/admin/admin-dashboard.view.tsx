import React from "react";
import { Layout, Card, Row, Col, Typography, Table, Button } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const { Content } = Layout;
const { Text } = Typography;

const stats = [
  { title: "Total Users", value: "1,250" },
  { title: "Total Package Active", value: "345" },
  { title: "Total Package Price", value: "150" },
  { title: "New Signups Today", value: "78" },
];

const chartData = [
  { name: "Total Users", value: 1250 },
  { name: "Total Package Active", value: 345 },
  { name: "Total Package Price", value: 150 },
  { name: "New Signups Today", value: 78 },
];

const lineChartData = [
  { name: "Jan", users: 400, signups: 120 },
  { name: "Feb", users: 600, signups: 150 },
  { name: "Mar", users: 800, signups: 200 },
  { name: "Apr", users: 1000, signups: 250 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const sortedChartData = [...chartData].sort((a, b) => b.value - a.value);

const columns = [
  { title: "Rank", dataIndex: "rank", key: "rank" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Value", dataIndex: "value", key: "value" },
];

const dataSource = sortedChartData.map((item, index) => ({
  key: index,
  rank: index + 1,
  name: item.name,
  value: item.value,
}));

const AdminDashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content style={{ margin: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card title={"Người dùng"} bordered={false}>
                <Text strong style={{ fontSize: "24px" }}>
                  123
                </Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card title={"Người dùng mới hằng tuần"} bordered={false}>
                <Text strong style={{ fontSize: "24px" }}>
                  123
                </Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card title={"Doanh thu bán ra"} bordered={false}>
                <Text strong style={{ fontSize: "24px" }}>
                  1234
                </Text>
              </Card>
            </Col>

            <Col span={6}>
              <Card title={"Sử dụng cài đặt pomodoro"} bordered={false}>
                <Text strong style={{ fontSize: "24px" }}>
                  123
                </Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Doanh thu tháng này" style={{ marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Phân tích dữ liệu" style={{ marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="signups"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Card
            title="Top người dùng sử dụng nhiều nhất"
            style={{ marginTop: "20px" }}
          >
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

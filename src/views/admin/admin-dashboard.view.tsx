import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Table } from "antd";
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
  Legend,
} from "recharts";
import { DashboardService } from "@/services/dashboard.service";
import Loader from "@/components/loading";

const { Content } = Layout;
const { Text } = Typography;

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

const columns = [
  { title: "Tên gói", dataIndex: "name", key: "name" },
  {
    title: "Số lượng gói bán được",
    dataIndex: "countBuyPackage",
    key: "countBuyPackage",
  },
  { title: "Token", dataIndex: "sumAmountPackage", key: "sumAmountPackage" },
];

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataDashboard, setDataDashboard] = useState({
    totalUser: 0,
    userRegisterPackage: 0,
    totalRevenue: [],
    analysisPackageAmount: [],
    analysisPackageTotal: [],
    tablePackage: [],
  });
  const asyncDataDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await DashboardService.getDashboardAdmin();
      setDataDashboard(response);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    asyncDataDashboard();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Layout>
            <Content style={{ margin: "20px" }}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title={"Người dùng"} bordered={false}>
                    <Text strong style={{ fontSize: "24px" }}>
                      {dataDashboard.totalUser}
                    </Text>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title={"Người dung đăng ký gói"} bordered={false}>
                    <Text strong style={{ fontSize: "24px" }}>
                      {dataDashboard.userRegisterPackage}
                    </Text>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title={"Doanh thu"} bordered={false}>
                    <Text strong style={{ fontSize: "24px" }}>
                      {dataDashboard.totalRevenue.toLocaleString()} đ
                    </Text>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card
                    title="Thống kê số lượng gói bán ra"
                    style={{ marginTop: "20px" }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dataDashboard.analysisPackageTotal}
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
                  <Card
                    title="Thống kê số tiền bán ra của các gói"
                    style={{ marginTop: "20px" }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dataDashboard.analysisPackageAmount}
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
              </Row>
              <Row>
                <Col span={24}>
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

              <Card title="Bảng xếp hàng các gói" style={{ marginTop: "20px" }}>
                <Table
                  columns={columns}
                  dataSource={dataDashboard.tablePackage}
                  pagination={false}
                />
              </Card>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default AdminDashboard;

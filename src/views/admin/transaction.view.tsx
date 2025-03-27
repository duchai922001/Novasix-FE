import React, { useEffect, useState } from "react";
import { Table, Input, Select, Tag, Modal, Button, Space } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { handleError } from "@/utils/catch-error";
import { OrderService } from "@/services/order.service";
import dayjs from "dayjs";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@/components/loading";

const { Option } = Select;

interface Transaction {
  key: string;
  id: string;
  user: string;
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
}

const initialTransactions: Transaction[] = [
  {
    key: "1",
    id: "TXN001",
    user: "Nguyễn Văn A",
    amount: 500000,
    status: "success",
    date: "2025-03-01",
  },
  {
    key: "2",
    id: "TXN002",
    user: "Trần Thị B",
    amount: 300000,
    status: "pending",
    date: "2025-03-02",
  },
  {
    key: "3",
    id: "TXN003",
    user: "Lê Văn C",
    amount: 700000,
    status: "failed",
    date: "2025-03-03",
  },
  {
    key: "4",
    id: "TXN004",
    user: "Phạm Minh D",
    amount: 200000,
    status: "success",
    date: "2025-03-04",
  },
];

const TransactionManagement: React.FC = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const debouncedSearchText = useDebounce(searchText, 500);

  const asyncDataTransaction = async () => {
    try {
      setIsLoading(true);
      const response = await OrderService.getAllOrder(
        searchText,
        searchText,
        selectedStatus
      );
      setTransactions(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncDataTransaction();
  }, [selectedStatus, debouncedSearchText]);
  const columns: ColumnsType<Transaction> = [
    { title: "Mã Giao Dịch", dataIndex: "transId", key: "transId" },
    {
      title: "Người Gửi",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <p>{userId?.username ?? "không tìm thấy"}</p>,
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>{amount.toLocaleString()} VNĐ</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "success"
              ? "green"
              : status === "pending"
              ? "gold"
              : "red"
          }
        >
          {status === "success"
            ? "Thành công"
            : status === "pending"
            ? "Chờ duyệt"
            : "Thất bại"}
        </Tag>
      ),
    },
    {
      title: "Ngày Giao Dịch",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => setSelectedTransaction(record)}
        >
          Xem
        </Button>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="transaction-container">
          <h2>Quản Lý Giao Dịch</h2>
          <div className="transaction-filters">
            <Input
              placeholder="Tìm kiếm theo mã giao dịch hoặc người gửi..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Lọc theo trạng thái"
              allowClear
              onChange={(value) => setSelectedStatus(value || "")}
              value={selectedStatus}
            >
              <Option value="success">Thành công</Option>
              <Option value="pending">Chờ duyệt</Option>
              <Option value="failed">Thất bại</Option>
            </Select>
          </div>
          <Table columns={columns} dataSource={transactions} rowKey="key" />

          {/* Modal chi tiết giao dịch */}
          {selectedTransaction && (
            <Modal
              title="Chi Tiết Giao Dịch"
              visible={!!selectedTransaction}
              onCancel={() => setSelectedTransaction(null)}
              footer={[
                <Button
                  key="close"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Đóng
                </Button>,
              ]}
            >
              <p>
                <strong>Mã Giao Dịch:</strong> {selectedTransaction.id}
              </p>
              <p>
                <strong>Người Gửi:</strong> {selectedTransaction.user}
              </p>
              <p>
                <strong>Số Tiền:</strong>{" "}
                {selectedTransaction.amount.toLocaleString()} VNĐ
              </p>
              <p>
                <strong>Trạng Thái:</strong>
                <Tag
                  color={
                    selectedTransaction.status === "success"
                      ? "green"
                      : selectedTransaction.status === "pending"
                      ? "gold"
                      : "red"
                  }
                >
                  {selectedTransaction.status === "success"
                    ? "Thành công"
                    : selectedTransaction.status === "pending"
                    ? "Chờ duyệt"
                    : "Thất bại"}
                </Tag>
              </p>
              <p>
                <strong>Ngày Giao Dịch:</strong> {selectedTransaction.date}
              </p>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default TransactionManagement;

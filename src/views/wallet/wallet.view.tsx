import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Card, Row, Col, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PaymentService } from "@/services/payment.service";
import { handleError } from "@/utils/catch-error";
import { WalletService } from "@/services/wallet.service";
import { OrderService } from "@/services/order.service";
import dayjs, { Dayjs } from "dayjs";

const data = [
  {
    key: "1",
    id: "IO-BN-124",
    date: "04 Mar 2018",
    amount: 1044,
    status: "Paid",
  },
  {
    key: "2",
    id: "IO-BN-127",
    date: "03 Dec 2018",
    amount: 994.2,
    status: "Paid",
  },
  {
    key: "3",
    id: "IO-BN-167",
    date: "10 Dec 2018",
    amount: 6904,
    status: "Paid",
  },
  {
    key: "4",
    id: "IO-BN-172",
    date: "16 May 2018",
    amount: 3400,
    status: "Pending",
  },
  {
    key: "5",
    id: "IO-BN-178",
    date: "04 Mar 2018",
    amount: 480,
    status: "Pending",
  },
  {
    key: "6",
    id: "IO-BN-196",
    date: "08 Mar 2018",
    amount: 994,
    status: "Pending",
  },
  {
    key: "7",
    id: "IO-BN-215",
    date: "17 Oct 2018",
    amount: 9000,
    status: "Cancelled",
  },
];

const Wallet = () => {
  const [user, setUser] = useState({
    _id: "",
  });
  const [tokenUser, setTokenUser] = useState<number>(0);
  const [numberToken, setNumberToken] = useState<number>(200);
  const [dataOrder, setDataOrder] = useState([]);
  const columns = [
    { title: "Mã order", dataIndex: "transId", key: "transId" },
    {
      title: "Ngày giao dịch",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <p>{dayjs(date).format("DD/MM/YYYY HH:mm:ss")}</p>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString("vi-VN")} vnd`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color =
          status === "success"
            ? "green"
            : status === "pending"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  const asyncOrderUser = async () => {
    try {
      const response = await OrderService.getOrderOfUser();
      setDataOrder(response);
    } catch (error) {
      handleError(error);
    }
  };
  const asyncWalletUser = async () => {
    try {
      const response = await WalletService.getWalletOfUser();
      setTokenUser(response);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    setUser(user);
    asyncWalletUser();
    asyncOrderUser();
  }, []);
  const handleDeposite = async () => {
    try {
      const response = await PaymentService.createPayment({
        amount: numberToken * 100,
        userId: user._id,
      });
      if (response && response.order_url) {
        window.location.href = response.order_url;
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Row gutter={[12, 12]} style={{ width: "100%" }}>
      <Col span={16}>
        <Card title="Giao dịch">
          <Table columns={columns} dataSource={dataOrder} pagination={false} />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Nạp Token">
          <Row gutter={[12, 12]}>
            <Input
              type="number"
              min={0}
              defaultValue={numberToken}
              onChange={(e) => setNumberToken(Number(e.target.value))}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleDeposite}
            >
              Nạp
            </Button>
          </Row>
          <Typography.Text italic>
            10,000 vnd tương ứng với 100 token
          </Typography.Text>
        </Card>
        <Card title="Ví bạn" style={{ marginTop: 16 }}>
          <h2>💰 {tokenUser}</h2>
        </Card>
      </Col>
    </Row>
  );
};

export default Wallet;

import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Card, Row, Col, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PaymentService } from "@/services/payment.service";
import { handleError } from "@/utils/catch-error";
import { WalletService } from "@/services/wallet.service";
import { OrderService } from "@/services/order.service";
import dayjs from "dayjs";
import Loader from "@/components/loading";

const Wallet = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  const cancel = urlParams.get("cancel");
  const orderCode = urlParams.get("orderCode");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState({
    _id: "",
  });
  const [tokenUser, setTokenUser] = useState<number>(0);
  const [numberToken, setNumberToken] = useState<number>(200);
  const [dataOrder, setDataOrder] = useState([]);
  const updateOrderStatus = async (data: {
    transId: string;
    status: string;
  }) => {
    try {
      await OrderService.updateStatusOrder(data);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (status && orderCode) {
      if (cancel === "false") {
        const payload = {
          transId: orderCode ?? "",
          status: "success",
        };
        updateOrderStatus(payload);
      } else {
        const payload = {
          transId: orderCode ?? "",
          status: "failed",
        };
        updateOrderStatus(payload);
      }
    }
  }, []);
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
        const color =
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
      setIsLoading(true);
      const response = await OrderService.getOrderOfUser();
      setDataOrder(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncWalletUser = async () => {
    try {
      setIsLoading(true);
      const response = await WalletService.getWalletOfUser();
      setTokenUser(response);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
      if (response && response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[12, 12]} style={{ width: "100%" }}>
          <Col span={16}>
            <Card title="Giao dịch">
              <Table
                columns={columns}
                dataSource={dataOrder}
                pagination={false}
              />
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
      )}
    </>
  );
};

export default Wallet;

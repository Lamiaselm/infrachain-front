import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Table,
  InputNumber,
  Divider,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Form,
  Button,
} from "antd";

import { CustValue, ClientValue, RecentCust } from "../components/CustValue";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StockOutlined,
  PoundCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Meta } = Card;

const MarketPlace = ({}) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page H",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page I",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page J",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page K",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const onFinish = (values) => {
    console.log("Success:", values);
    setList([...list, values]);
  };
  return (
    <>
      <Container>
        <h2>Welcome Provider to MarketPlace</h2>
        <Row gutter={16}>
          <Col span={5}>
            <Card
              title="Order Book"
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#fff",
                height: 400,
              }}
            >
              <p style={{ color: "#f0100c" }}>
                Quantity (tokens) &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;Price
                (€)
              </p>
              {list.length > 0 &&
                list.map((item, index) => (
                  <>
                    <b>
                      <p key={index}>
                        {item.quantity}&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;{item.price}
                      </p>
                    </b>
                  </>
                ))}
            </Card>
          </Col>
          <Col span={14}>
            <Card
              title="Market Statistics"
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#fff",
                height: 500,
              }}
            >
              <LineChart width={760} height={400} data={data}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#f0100c"
                  activeDot={{ r: 9 }}
                  strokeWidth={2}
                />
                {/* <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#82ca9d"
                  strokeWidth={2}
                /> */}
              </LineChart>
            </Card>
          </Col>
          <Col span={5}>
            <Card
              title="Make Offer"
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#fff",
                height: 400,
              }}
            >
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item name="quantity" label="Quantity">
                  <InputNumber />
                </Form.Item>
                <Form.Item name="price" label="Price (€)">
                  <InputNumber />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Container = styled.div`
  padding: 0 10px;
`;
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

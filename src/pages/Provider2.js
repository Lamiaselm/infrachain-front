import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { Divider, Tag, Card, Row, Col, Button, Modal, Image } from "antd";
import { Table } from "ant-table-extensions";
import { SearchOutlined } from "@ant-design/icons";
import { CustValue, ClientValue, RecentCust } from "../components/CustValue";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import excelfile from "../assets/excelfile.jpeg";
const Provider2 = ({}) => {
  const [taxSheetModalVisible, setTaxSheetModalVisible] = useState(false);

  const onOpenTaxSheetModel = (record) => {
    setTaxSheetModalVisible(true);
  };
  const onCloseModal = () => {
    setTaxSheetModalVisible(false);
  };
  const renderTaxSheetModel = () => (
    <Modal
      title={`My Tax Sheet`}
      centered
      visible={taxSheetModalVisible}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={600}
      height={1000}
      style={{
        top: 150,
      }}
    >
      <Row>
        <Col>
          <Image width={200} src={excelfile} />
          <Divider orientation="left" orientationMargin="0">
            Result
          </Divider>
          <h3 style={{ color: "#0ac713" }}>Extra Tax to pay is 0€</h3>
        </Col>
      </Row>
    </Modal>
  );
  const dataChart = [
    { name: "March", uv: 400, pv: 2400, amt: 2400 },
    { name: "April", uv: 600, pv: 1400, amt: 1100 },
    { name: "May", uv: 100, pv: 300, amt: 400 },
    { name: "June", uv: 900, pv: 2400, amt: 3400 },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Energy Consumption",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Customer Rate",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "green" : "green";
            if (tag === "Bad") {
              color = "volcano";
            }
            if (tag === "Good") {
              color = "geekblue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },

    {
      title: "Total Tokens",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {/* <Divider type="vertical" /> */}
          <a>Go To Profile</a>
        </span>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 3200,
      address: "New York No. 1 Lake Park",
      token: 10,
      tags: ["Good"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 4000,
      address: "London No. 1 Lake Park",
      token: 23,
      tags: ["Excellent"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 3000,
      address: "Sidney No. 1 Lake Park",
      token: 6,
      tags: ["Bad"],
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <h1>Welcome Provider2</h1>
        <Row>
          <Col span={12}>
            <Card
              title="Monthly Consumption chart"
              bordered={false}
              style={{
                marginBottom: 30,
                marginRight: 50,
                background: "#fff",
              }}
            >
              <LineChart
                width={600}
                height={300}
                data={dataChart}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Global Statistics"
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#fff",
              }}
            >
              <Row>
                <Col span={12}>
                  <CustValue title="Total consumption" value="3200" />
                </Col>
                <Col span={12}>
                  {" "}
                  <ClientValue title="Total clients" value="32" />
                </Col>
              </Row>
            </Card>
            <Card
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#1677ff",
                height: 212,
                color: "#fff",
              }}
            >
              <h1>Tax Sheet </h1>
              <p>Click here to Visualize my tax sheet</p>
              <Button
                type="primary"
                //   icon={<DownloadOutlined />}
                size="large"
                onClick={() => onOpenTaxSheetModel()}
                style={{ backgroundColor: "#fff", color: "#1677ff" }}
              >
                Go to Tax Sheet
              </Button>
            </Card>
          </Col>
        </Row>
        <h2>All customers</h2>
        <Table
          columns={columns}
          dataSource={data}
          searchableProps={{
            inputProps: {
              placeholder: "Search this table...",
              prefix: <SearchOutlined />,
            },
          }}
        />
        {renderTaxSheetModel()}
      </Container>
    </>
  );
};
const Container = styled.div`
  padding: 0 40px;
`;
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Provider2);

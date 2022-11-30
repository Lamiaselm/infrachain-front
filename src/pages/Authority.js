import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Divider,
  Button,
  Tag,
  Card,
  Row,
  Col,
  Space,
  Form,
  Modal,
  InputNumber,
  message,
} from "antd";
import clientActions, { clientSelectors } from "../redux/clientRedux";

import { Table } from "ant-table-extensions";
import { Outlet, Link } from "react-router-dom";

import { CustValue, ClientValue, RecentCust } from "../components/CustValue";
import { SearchOutlined } from "@ant-design/icons";
const Authority = ({ generate, generateToken }) => {
  const columnsProv = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Consumption",
      dataIndex: "consume",
      key: "consume",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        record.key == 1 ? (
          <Link to="provider" target="_blank">
            Visualize profile
          </Link>
        ) : (
          <Link to="provider2" target="_blank">
            Visualize profile
          </Link>
        ),
    },
  ];
  const columnsCust = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Total Consumption",
      dataIndex: "consume",
      key: "consume",
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
        <Space size="middle">
          <Link to="client" target="_blank">
            Visualize profile
          </Link>
          <Button onClick={() => onOpenSeuilModel(record)} type="link">
            Fix Threshold
          </Button>
        </Space>
      ),
    },
  ];

  const [generateModalVisible, setGenerateModalVisible] = useState(false);
  const [seuilModalVisible, setSeuilModalVisible] = useState(false);
  const [taxModalVisible, setTaxModalVisible] = useState(false);
  const [tokenModalVisible, setTokenModalVisible] = useState(false);

  const [form] = Form.useForm();

  const onOpenGenerateModel = (record) => {
    setGenerateModalVisible(true);
  };
  const onOpenTokeneModel = (record) => {
    setTokenModalVisible(true);
  };
  const onOpenSeuilModel = (record) => {
    setSeuilModalVisible(true);
  };
  const onOpenTaxModel = (record) => {
    setTaxModalVisible(true);
  };
  const onCloseModal = () => {
    setGenerateModalVisible(false);
    setTaxModalVisible(false);
    setTokenModalVisible(false);
  };
  const onGenerateToken = (values) => {
    generateToken({
      onSuccess: (data) => {
        message.success(
          <a
            target="_blank"
            href={`https://testnet.bscscan.com/tx/${data.data.transactionHash}`}
          >
            Transaction's Link
          </a>
        );
        onCloseModal(true);
      },
      onFail: () => message.error("Token failed."),
    });
  };
  const renderTokenModal = () => (
    <Modal
      title="Provide tokens in the marketplace"
      visible={tokenModalVisible}
      onCancel={() => setTokenModalVisible(false)}
      // onOk={handleOk}
      onOk={onGenerateToken}
      confirmLoading={generate}
    >
      <p>Do you want to put tokens in the marketplace?</p>
    </Modal>
  );
  const renderGenerateTokenModal = () => (
    <Modal
      title={`Are you sure you want to generate token for this client ?`}
      centered
      visible={generateModalVisible}
      onOk={onCloseModal}
      onCancel={onCloseModal}
    />
  );
  const renderSeuilModal = () => (
    <Modal
      title="Fix Monthly Consumption Limit"
      visible={seuilModalVisible}
      onCancel={() => setSeuilModalVisible(false)}
      //   confirmLoading={creating}
      footer={[
        <Button key="back" onClick={() => setSeuilModalVisible(false)}>
          Cancel
        </Button>,
        <Button
          //   onClick={() => addForm.submit()}
          onClick={() => setSeuilModalVisible(false)}
          htmlType="submit"
          type="primary"
          //   loading={creating}
        >
          Fix Value
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="seuil" label="Maximum Monthly Consumption Limit">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
  const renderTaxModal = () => (
    <Modal
      title="Fix TAX Value"
      visible={taxModalVisible}
      onCancel={() => setTaxModalVisible(false)}
      //   confirmLoading={creating}
      footer={[
        <Button key="back" onClick={() => setTaxModalVisible(false)}>
          Cancel
        </Button>,
        <Button
          //   onClick={() => addForm.submit()}
          onClick={() => setTaxModalVisible(false)}
          htmlType="submit"
          type="primary"
          //   loading={creating}
        >
          Fix Value
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="tax" label="Maximum Tax Value to apply">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );

  const dataProv = [
    {
      key: "1",
      role: "Energy Provider",
      name: "Berube orson",
      address: "3 Rue Saint-Henri, 4306 Esch-sur-Alzette",
      consume: 3200 + "Kwh",
    },
    {
      key: "2",
      role: "Energy Provider",
      name: "Michel laderoute",
      address: "13 Rue du Château, 3217 Bettembourg",
      consume: 1600 + "Kwh",
    },
  ];
  const dataCust = [
    {
      key: "1",
      name: "John Brown",
      address: "New York No. 1 Lake Park",
      provider: "Berube orson",
      consume: 200 + "Kwh",
      token: 10,
    },
    {
      key: "2",
      name: "Sarah Brown",
      address: "New York No. 1 Lake Park",
      provider: "Berube orson",
      consume: 300 + "Kwh",
      token: 78,
    },
    {
      key: "3",
      name: "Damien Nicolas",
      address: "Luxembourg",
      provider: "Michel laderoute",
      consume: 500 + "Kwh",
      token: 109,
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <h1>Welcome Authority</h1>

        <Row>
          <Col span={12}>
            <Card
              title="Global Statistics"
              bordered={false}
              style={{
                marginBottom: 30,
                marginRight: 70,
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
                <Col span={12}>
                  {" "}
                  <CustValue title="Total consumption" value="3200" />
                </Col>
                <Col span={12}>
                  {" "}
                  <CustValue title="Total consumption" value="3200" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Row>
              {" "}
              <Card
                title="Provide token in the market"
                bordered={false}
                style={{
                  marginBottom: 30,
                  background: "#fff",
                  height: 232,
                  width: 300,
                  marginRight: 60,
                }}
              >
                <p>Click here to provide tokens </p>
                <Button
                  type="primary"
                  shape="round"
                  //   icon={<DownloadOutlined />}
                  size="large"
                  onClick={() => onOpenTokeneModel()}
                >
                  Provide Tokens
                </Button>
              </Card>{" "}
              <Card
                title="Fix Monthly Tax Value"
                bordered={false}
                style={{
                  marginBottom: 30,
                  background: "#fff",
                  height: 232,
                  width: 300,
                }}
              >
                <p>Click here to fix the Monthly Tax </p>
                <Button
                  type="primary"
                  shape="round"
                  //   icon={<DownloadOutlined />}
                  size="large"
                  onClick={() => onOpenTaxModel()}
                >
                  Fix Monthly Tax
                </Button>
              </Card>
            </Row>
          </Col>
        </Row>

        <h2>List of all providers</h2>
        <Table
          columns={columnsProv}
          dataSource={dataProv}
          searchableProps={{
            inputProps: {
              placeholder: "Search this table...",
              prefix: <SearchOutlined />,
            },
          }}
        />
        <h2>List of all customers</h2>
        <Table
          columns={columnsCust}
          dataSource={dataCust}
          searchableProps={{
            inputProps: {
              placeholder: "Search this table...",
              prefix: <SearchOutlined />,
            },
          }}
        />
        {renderGenerateTokenModal()}
        {renderSeuilModal()}
        {renderTaxModal()}
        {renderTokenModal()}
      </Container>
    </>
  );
};
const Container = styled.div`
  padding: 0 40px;
`;
const mapStateToProps = (state) => ({
  generate: clientSelectors.generate(state),
});

const mapDispatchToProps = {
  generateToken: clientActions.generateTokenRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authority);

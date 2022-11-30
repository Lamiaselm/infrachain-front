import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Col,
  Row,
  Card,
  DatePicker,
  Switch,
  Button,
  message,
  Modal,
} from "antd";
import { connect } from "react-redux";
import EmfChart from "../components/ConsumChart";
import sensorDetailsActions, {
  sensorDetailsSelectors,
} from "../redux/sensorDetailsRedux";
import clientActions, { clientSelectors } from "../redux/clientRedux";
import {
  getFrequencies,
  prepareMeasurements,
} from "../utils/measurementsUtils";
import Loader from "../components/Loader";
import useInterval from "../utils/hooks";
import { CustValue, ClientValue, RecentCust } from "../components/CustValue";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const Client = ({
  getBalance,
  claimReward,
  creating,
  getMeasurements,
  fetching,
  getConsumption,
  sensorData,
  measurements,
  getSensor,
  fetchingM,
}) => {
  const dataChart = [
    { name: "March", uv: 400, pv: 2400, amt: 2400 },
    { name: "April", uv: 600, pv: 1400, amt: 1100 },
    { name: "May", uv: 100, pv: 300, amt: 400 },
    { name: "June", uv: 900, pv: 2400, amt: 3400 },
  ];
  const params = useParams();
  const [showLimit, setShowLimit] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [balance, setBalance] = useState(0);
  const [list, setList] = useState([]);
  const [claimVisible, setClaimVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState([]);

  const onOpenClaimModel = (record) => {
    setClaimVisible(true);
  };
  const onCloseModel = (record) => {
    setClaimVisible(false);
  };
  const onClaimReward = (values) => {
    claimReward({
      data: { user: "client1" },
      onSuccess: (data) => {
        message.success(
          <a
            target="_blank"
            href={`https://testnet.bscscan.com/tx/${data.data.transactionHash}`}
          >
            Transaction's Link
          </a>
        );
        onCloseModel(true);
      },
      onFail: () => message.error("Claim Reward failed."),
    });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setClaimVisible(false);
      setConfirmLoading(false);
      message.success(
        `Success ! Here is your transaction Hash : 0x25c2b99e696abd4b875da08aa08a4c89ab1954e97591741b90bfbdcad722ebd9`
      );
      setBalance(parseInt(balance) + 20);
    }, 2000);
  };

  const renderClaimModal = () => (
    <Modal
      title="Claim Rewards"
      visible={claimVisible}
      onCancel={() => setClaimVisible(false)}
      // onOk={handleOk}
      onOk={onClaimReward}
      confirmLoading={creating}
    >
      <p>Do you want to claim your rewards?</p>
    </Modal>
  );
  // useEffect(() => {
  //   getConsumption({
  //     data: { user: "client1" },
  //     onSuccess: (data) => {
  //       console.log("data", data.data);
  //       // let tempArr = list;

  //       // tempArr.push(data.data);
  //       // setList(tempArr);
  //       // console.log("consumption", list);

  //       // setValue([data.data, data.data, data.data]);
  //       setValue([...value, data.data]);
  //     },
  //   });
  // });
  getConsumption({
    data: { user: "client1" },
    onSuccess: (data) => {
      console.log("data", data.data);
      // let tempArr = list;

      // tempArr.push(data.data);
      // setList(tempArr);
      // console.log("consumption", list);

      // setValue([data.data, data.data, data.data]);
      setValue([...value, data.data]);
    },
  });
  // console.log("list", list);
  // useInterval(() => {
  //   getConsumption({
  //     data: { user: "client1" },
  //     onSuccess: (data) => {
  //       let tempArr = list;

  //       tempArr.push(data.data);
  //       setList(tempArr);
  //       console.log("consumption", list);

  //       // setValue([data.data, data.data, data.data]);
  //     },
  //   });
  // }, 5000);

  const orderedMeasurements = prepareMeasurements(measurements);
  // useEffect(() => {
  //   getBalance({ date: { user: "client1" } });
  // }, balance);
  getBalance({
    data: { user: "client1" },
    onSuccess: (data) => {
      console.log("power onsuccess", data.data);
      setBalance(data.data.balance / 10);
    },
    onFail: () => message.error("Faild To Load Balance."),
  });
  return (
    <>
      <Loader spinning={fetching} />
      <Container>
        <h1>Welcome Lamia</h1>

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
            <Card
              bordered={false}
              style={{
                marginBottom: 30,
                background: "#1677ff",
                height: 232,
                color: "#fff",
              }}
            >
              <h1>My tokens balance </h1>

              <h1 style={{ fontSize: 37 }}>{balance}</h1>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ChartContainer>
              <div style={{ height: " 400px" }}>
                <EmfChart
                  showLimit={showLimit}
                  data={value}
                  // data={list}
                />
              </div>
              <Switch onChange={(value) => setShowLimit(value)} />
              <span> Display the maximum consumption limit </span>
            </ChartContainer>
            <Row>
              <Col span={12}>
                <Card
                  loading={fetching}
                  title="Claim Rewards"
                  bordered={false}
                  style={{
                    height: 200,
                    marginBottom: 30,
                    marginRight: 40,
                    backgroundColor: "ffa20d",
                  }}
                >
                  <p>Click here to claim rewards</p>
                  <Button
                    type="primary"
                    //   icon={<DownloadOutlined />}
                    size="large"
                    // onClick={onClaimReward}
                    onClick={() => onOpenClaimModel()}
                  >
                    Claim Rewards
                  </Button>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  loading={fetching}
                  title="Sell Tokens"
                  bordered={false}
                  style={{
                    height: 200,
                    marginBottom: 30,
                    marginRight: 40,
                  }}
                >
                  <p>Click here to sell Tokens</p>
                  <Button
                    type="primary"
                    //   icon={<DownloadOutlined />}
                    size="large"
                    // onClick={() => onOpenClaimModel()}
                  >
                    Sell Tokens
                  </Button>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {renderClaimModal()}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 40px;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
`;

const DatePickerContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 10px;
  align-items: center;
`;

const mapStateToProps = (state) => ({
  sensorData: sensorDetailsSelectors.getData(state),
  balance: clientSelectors.getData(state),
  measurements: sensorDetailsSelectors.getMeasurements(state),
  fetching: sensorDetailsSelectors.fetching(state),
  fetchingM: sensorDetailsSelectors.fetchingM(state),
  value: clientSelectors.getConsumpData(state),
  creating: clientSelectors.creating(state),
});

const mapDispatchToProps = {
  getMeasurements: sensorDetailsActions.getSensorMeasurementsRequest,
  getSensor: sensorDetailsActions.getSensorDetailsRequest,
  getBalance: clientActions.getBalanceRequest,
  getConsumption: clientActions.getConsumptionRequest,
  claimReward: clientActions.claimRewardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Client);

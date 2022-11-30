import React from "react";
import { Statistic } from "antd";
import styled from "styled-components";

const CustValue = ({ ...props }) => <Statistic suffix="kWh" {...props} />;
const ClientValue = ({ ...props }) => <Statistic suffix="clients" {...props} />;
const RecentCust = styled(CustValue)`
  .ant-statistic-content {
    color: rgb(0, 163, 224);
  }
  .ant-statistic-title {
    color: rgba(0, 163, 224, 0.8);
  }
`;

export { CustValue, RecentCust, ClientValue };

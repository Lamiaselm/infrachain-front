import { Layout, Menu } from "antd";
import React from "react";
import styled from "styled-components";
import { UserOutlined, BankOutlined } from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter } = Layout;

function MainLayout() {
  return (
    <Container hasSider={false}>
      <Header>
        <Link to="/">
          <div className="logo" />
        </Link>

        <Menu
          style={{ flex: 0.5 }}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Profile
            <Link to="/" />
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />}>
            <Link to="/market" />
            Marketplace
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <span>
          &copy;
          {new Date().getFullYear()}
        </span>
        &nbsp;
        <a target="__blank" href="https://www.list.lu/">
          Luxembourg Institute of Science & Technology - LIST
        </a>
        &nbsp;
        {/* <span>{`v${packageInfo.version}`}</span> */}
      </Footer>
    </Container>
  );
}

export default MainLayout;

const Container = styled(Layout)`
  // height: 'auto';
`;

const Content = styled(AntContent)`
  // min-height: 100%;
  height: "auto";
  background: #f0f2f5;
`;

const Footer = styled(AntFooter)`
  background-color: #fff !important;
  text-align: center;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Header = styled(AntHeader)`
  background-color: #fff !important;
  display: flex;
  justify-content: space-between;
`;

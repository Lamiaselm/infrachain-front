import React from 'react'
import { Typography, Layout } from 'antd'
import styled from 'styled-components'

function ContentLayout({ title, renderRightSide = () => null, children }) {
  return (
    <Container>
      <HeaderContainer>
        <Typography.Title level={3}>{title}</Typography.Title>
        {renderRightSide()}
      </HeaderContainer>

      <ContentContainer>{children}</ContentContainer>
    </Container>
  )
}

export default ContentLayout

const Container = styled.div`
  margin: 24px 16px 0;
  overflow: initial;
  min-height: 50vh;
  flex: 1;
  flex-direction: column;
`

const ContentContainer = styled.div`
  padding: 24px;
  height: 100%;
  background-color: #fff;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

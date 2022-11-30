import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Loader = ({ spinning = true }) => (
  <Container spinning={spinning} size="large" />
)

export default Loader

const Container = styled(Spin)`
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px 2px #eee;
  left: 50%;
  padding: 5px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`

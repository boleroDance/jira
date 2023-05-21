/* 
  组件的快照测试
  有UI组件参与
*/
import { Row, Col } from 'antd'
import React, { CSSProperties, FC } from 'react'

interface Props {
  type: "large" | "small";
  title: string
}


// large 样式
const largeStyle = {
  fontSize: "2em",
  color: "pink",
}

// small 模式
const smallStyle = {
  fontSize: "0.5em",
  color: "green"
}

// 样式 Mapper
const styleMapper = {
  small: smallStyle,
  large: largeStyle
}

const Title: FC<Props> = (props) => {
  const { title, type } = props
  return (
  <Row style={styleMapper[type]}>
    <Col span={12}>
    col
    </Col>
    <Col span={12}>
    <div>
      {title}
    </div>
    </Col>
  </Row>
  )
}

export default Title
import React, { Component,useState } from 'react'
import ReactDOM  from 'react-dom'
/** 
export default class EffectHook extends Component {
  state = {
    count: 0
  }
  timer: NodeJS.Timer | undefined

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(
        state => ({count: this.state.count + 1})
      )
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  add = () => {
    this.setState(state => ({
      count: this.state.count + 1
    }))
  }

  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.add}>click to add</button>
      </div>
    )
  }
}
*/

const effectHook:React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount(count => count + 1)
  }

  React.useEffect(() => {
    console.log('add effect')
    let timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    
    return () => {
      // 替代 class component 的 componentWillUnmount
      console.log('unmout effect')
      clearInterval(timer)
    }
  }, [])

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root') as any)
  }

return (
  <div>
        <h2>{count}</h2>
        <button onClick={add}>click to add</button>
        <button onClick={unmount}>click to unmount component</button>
      </div>
)
}

export default effectHook

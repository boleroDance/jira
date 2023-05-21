import React from 'react'
import axios from 'axios'

interface ILoaderProps {
  data: any,
  isLoading: false
}

interface ILoaderState {
  data: any,
  isLoading: boolean
}

const withLoader =<P extends ILoaderProps>(WrapperedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
    constructor (props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false
      }
    }

    componentDidMount() {
      this.setState({
        data: this.setState({
          isLoading: true
        })
      })

      axios.get(url).then(res => {
        this.setState({
          data: res.data,
          isLoading: false
        })
      })
    }

    render() {
      const { data, isLoading } = this.state
      return (
        <>
        {
          (isLoading || !data) ? <p>data is loading</p> :
          <WrapperedComponent {...this.props as P} data={data} />
        }
        </>
      )
    }
  }

}

export default withLoader

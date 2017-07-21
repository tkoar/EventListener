import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = {
  title: 'ABCDEFGHIJKLMNOP',
  description: "GREAT",
  image: 'https://s-media-cache-ak0.pinimg.com/originals/1b/62/4e/1b624e3f7915cf91c6dfa2219da247a5.png',
  price: 20
}

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()



      this.setState({
        isLoading: false,
        results: source,
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <div>
          <Search size='tiny'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
      </div>
    )
  }
}

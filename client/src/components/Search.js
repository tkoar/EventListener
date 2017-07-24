import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'


export default class SearchExampleStandard extends Component {
  state = {
    results: []
  }

  componentWillMount() {
    // this.resetComponent()
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(res => this.setState({results: res}))
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()



      this.setState({
        isLoading: false,
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

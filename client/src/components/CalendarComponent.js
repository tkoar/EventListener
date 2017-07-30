import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DateRange } from 'react-date-range'
import * as actions from '../actions'
const { dateRange } = actions


class Calendar extends Component {

  setDateRange = (range) => {
    let start = new Date(range.startDate._d.toString())
    let end = new Date(range.endDate._d.toString())
    let dateRange = {startDate: start, endDate: end}
    this.props.dateRange(dateRange)
  }

  render() {
    return(
      <DateRange
        // onInit={this.setDateRange}
        onChange={this.setDateRange}
        linkedCalendars={true}
        calendars={1}
        theme={{
          DaySelected : {
            background : '#5C0029'
          },
          DayInRange : {
            background : '#E5FFDE',
            color : '#5C0029'
          },
          DayHover : {
            background : '#5C0029',
            color : '#ffffff',
            transform : 'scale(1.1) translateY(-10%)',
            boxShadow : '0 2px 4px rgba(0, 0, 0, 0.4)'
            }
        }}
      />
    )
  }
}

function mapStateToProps (state) {
  return {events: state.events.events}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({dateRange: dateRange}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

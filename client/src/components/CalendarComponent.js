import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DateRange } from 'react-date-range'

import * as actions from '../actions'
const { dateRange } = actions


class Calendar extends Component {

  setDateRange = (range) => {
    if (range.reset === 'reset') {
      this.props.dateRange(range)
    } else {
      let start = new Date(range.startDate._d.toString())
      let end = new Date(range.endDate._d.toString())
      let dateRange = {startDate: start, endDate: end}
      this.props.dateRange(dateRange)
    }
  }

  render() {
    return(
      <div>
        {/* <Button onClick={this.setDateRange({reset: 'reset'})}>Remove Dates</Button> */}
        <DateRange
          startDate={ now => {return now}}
          endDate={ now => {return now.add(1,'month')}}
          onInit={this.setDateRange}
          onChange={this.setDateRange}
          linkedCalendars={true}
          calendars={1}
          theme={{
            DaySelected : {
              background : '#648A73'
            },
            DayInRange : {
              background : '#D4DFD8',
              color : '#5C0029'
            },
            DayHover : {
              background : '#648A73',
              color : '#ffffff',
              transform : 'scale(1.1) translateY(-10%)',
              boxShadow : '0 2px 4px rgba(0, 0, 0, 0.4)'
              }
          }}
        />
      </div>
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

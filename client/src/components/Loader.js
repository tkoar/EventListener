import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderExampleTextShorthand = () => (
  <div className='loader'>
    <Segment>
      <Dimmer active>
        <Loader content='Loading' />
      </Dimmer>
    </Segment>
  </div>
)

export default LoaderExampleTextShorthand

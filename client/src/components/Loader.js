import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderExampleTextShorthand = () => (
  <div className='loader'>
    <Segment>
      <Dimmer active>
        <Loader size='massive' content='Loading' />
      </Dimmer>
    </Segment>
  </div>
)

export default LoaderExampleTextShorthand

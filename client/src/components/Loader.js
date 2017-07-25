import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderExampleTextShorthand = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader content='Loading' />
      </Dimmer>
      {/* <Image src='/assets/images/wireframe/short-paragraph.png' /> */}
    </Segment>
  </div>
)

export default LoaderExampleTextShorthand

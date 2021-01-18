import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
   return (
      <Alert variant={variant}>
         {children}        
      </Alert>
   )
}

// define defaults for message 
Message.defaultProps = {
   variant: 'info'
}

export default Message

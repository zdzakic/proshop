import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
   return (
      <Helmet>
         <title>{title}</title>  
         <meta name='description' content={description}></meta>
         <meta name='keywords' content={keywords}></meta>
      </Helmet>
   )
}

Meta.defaultProps = {
   title: 'Velo e-Shop',
   description: 'Beste Velos in Schweyz',
   keywords: 'Velo, e-Velo, Veloverkaufen, gunstig',
}
export default Meta

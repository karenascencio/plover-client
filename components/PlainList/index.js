import React from 'react'
import Label from '../Label'
import PlainText from '../PlainText'

export default function TextWithLabel (props) {
  const { textLabel, textValues, textId } = props
  return (
    <div id={textId} className=''>
      <Label labelText={textLabel} />
      <ul>
        {
                    textValues.map((item, key) => (<li key={key}> <PlainText text={item} /></li>))
                }
      </ul>
    </div>
  )
}

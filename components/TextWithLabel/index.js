import React from 'react'
import Label from '../Label'
import PlainText from '../PlainText'

export default function TextWithLabel(props) {
    const {textLabel, textValue, textId} = props
    return (
        <div id={textId} className='' >
            <Label labelText={textLabel} />
            <PlainText text={textValue} />
      </div>
    )
}

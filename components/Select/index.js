import React from 'react'

export default function Select (props) {
  const { selectID, selectQuestion, outputOptions } = props
  return (
    <div>
      <label htmlFor={`${selectID}-select`}>
        {selectQuestion}
      </label>
      <select id={`${selectID}-select`}>
        {
          outputOptions.map((item, index) => {
            return (
              <option
                key={index}
                value={item}
              >
                {item}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

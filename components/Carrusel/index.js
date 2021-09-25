import React, { useState, useEffect } from 'react'
import CarruselCard from '../CarruselCard'
import useWindowSize from '../../hooks/useWindowSize'

export default function Carrusel (props) {
  const { cards } = props
  const size = useWindowSize()

  const [notes, setNotes] = useState(cards)

  function rightShift (arr) {
    arr.unshift(arr.pop())
    return arr
  }
  function leftShift (arr) {
    arr.push(arr.shift())
    return arr
  }
  function handleRightClick () {
    console.log(notes)
    setNotes([...rightShift(notes)])
  }
  function handleLeftClick () {
    console.log(notes)
    setNotes([...leftShift(notes)])
  }


  return (
    <div className='flex'>
      <button
        className='w-2.5vw'
        onClick={handleLeftClick}
      >{'<'}
      </button>
      <div className='flex justify-between items-center w-full sm:w-65vw h-140px'>
        {
            size.width <= 640 ? notes.slice(0, 2).map((item, key) => <CarruselCard key={key} name={item.name} procedure={item.procedure} date={item.date} />)
              : size.width <= 1024 ? notes.slice(0, 3).map((item, key) => <CarruselCard key={key} name={item.name} procedure={item.procedure} date={item.date} />)
                : notes.slice(0, 4).map((item, key) => <CarruselCard key={key} name={item.name} procedure={item.procedure} date={item.date} />)
      }
      </div>
      <button className='w-2.5vw' onClick={handleRightClick}>{'>'}</button>

    </div>
  )
}

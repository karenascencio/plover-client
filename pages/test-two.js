import React, { useState } from 'react'
import swal from 'sweetalert'

export default function testTwo () {
  const cardsContent =
    [
      { title: 'Title One', content: 'Apples are good but pink lady better.' },
      { title: 'Title Two', content: 'Apples are good but pink lady better.' },
      { title: 'Title Three', content: 'Apples are good but pink lady better.' },
      { title: 'Title Four', content: 'Apples are good but pink lady better.' }
    ]
  const [cardsInfo, setCardsInfo] = useState(cardsContent)

  const buttonHandler = event => {
    const cardToDelete = event.target.id
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          console.log(`${cardToDelete} is deleted!`)
          // const newArray = cardsContent.filter((card, index) => index !== cardToDelete)
          // setCardsInfo(newArray)
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success'
          })
        }
      })
  }

  return (
    <div className=' p-10 flex justify-between'>
      {
        cardsInfo.map((card, index) => {
          return (
            <div
              className='flex-col px-2 py-1 border border-plover-blue'
              key={index}
            >
              <h2>{card.title}</h2>
              <p>{card.content}</p>
              <button
                onClick={buttonHandler}
                id={index}
                className='px-2 py-1 bg-plover-blue text-white text-lg rounded'
              >
                Delete this!
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

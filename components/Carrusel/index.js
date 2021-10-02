import React, { useState, useEffect } from 'react'
import CarruselCard from '../CarruselCard'
import Slider from 'react-slick'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

export default function Carrusel (props) {
  const { cards } = props
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 974,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className=' flex w-full sm:w-70vw justify-center items-center my-10'>
      <Slider {...settings} className=' flex w-full md:w-70vw '>
        {cards.map((item, key) => <CarruselCard key={key} title={item.title} subtitle={item.subtitle} thirdTitle={item.thirdTitle} />)}
      </Slider>
    </div>
  )
}

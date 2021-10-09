import React, { useState, useEffect } from 'react'
import CarruselCard from '../CarruselCard'
import Slider from 'react-slick'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

export default function Carrusel (props) {
  const { cards } = props
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className=' w-90vw sm:w-60vw my-10 '>
      <Slider {...settings}>
        {cards.map((item, key) => <CarruselCard key={key} title={item.title} subtitle={item.subtitle} thirdTitle={item.thirdTitle} />)}
      </Slider>
    </div>
  )
}

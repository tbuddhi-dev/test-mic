// Carousel.js

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.scss';
import { useData } from '../../App';
// import Caro1 from '../../assets/carouselPictures/carousel-img-1.webp'

// const carouselData = [
//   {
//     id: 1,
//     picture: Caro1,
//     name: 'YTL REIT MTN',
//     description: 'Lorem ipsum dolor sit amet, sit amet  adipiscing elit.',
//   },
//   {
//     id: 2,
//     picture: Caro1,
//     name: 'Nike SuperRep 2',
//     description: 'Lorem ipsum dolor sit amet, sit amet  adipiscing elit.',
//   },
//   {
//     id: 3,
//     picture: Caro1,
//     name: 'Document Name',
//     description: 'Lorem ipsum dolor sit amet, sit amet  adipiscing elit.',
//   },
//   {
//     id: 4,
//     picture: Caro1,
//     name: 'Nike SuperRep 2',
//     description: 'Lorem ipsum dolor sit amet, sit amet  adipiscing elit.',
//   },
//   {
//     id: 5,
//     picture: Caro1,
//     name: 'Document Name',
//     description: 'Lorem ipsum dolor sit amet, sit amet  adipiscing elit.',
//   },
//   // Add more data objects for other slides
// ];

const CarouselCards = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  // const [carouselData, setCarouselData] = useState([]);
  const { companyData } = useData();
  
  
  // useEffect(() => {
  //   const fetchCarouselData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/multiple_company.json"); 
  //       console.log(response);
  
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const data = await response.json();
  //       console.log('Carousel Data:', data);
  //       setCarouselData(data);
  //     } catch (error) {
  //       console.error('Error fetching carousel data:', error);
  //     }
  //   };
  
  //   fetchCarouselData();
  // }, []);

  const handleChangeSlide = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  return (
    <>
      <div className="container">
      {companyData && companyData.map((slide) => (
        <input
          key={slide.id}
          type="radio"
          name="slider"
          className="d-none"
          id={`s${slide.id}`}
          checked={activeSlide === slide.id}
          onChange={() => handleChangeSlide(slide.id)}
        />
      ))}

      <div className="cards">
        {companyData && companyData.map((slide) => (
          <label key={slide.id} htmlFor={`s${slide.id}`} id={`slide${slide.id}`} className={`card ${activeSlide === slide.id ? 'active' : ''}`}>
            <div className="card">
              <div className="image">
                <img src={slide.picture} alt={slide.name} />
              </div>
              <div className="infos">
              <Link to={`/document/${slide.name}`} key={slide.id}>
                <span className="name">{slide.name}</span>
                <span className="lorem">{slide.description}</span>
                </Link>
              </div>
              {/* <a href="/contact" className="btn-contact">details</a> */}
            </div>
          </label>
        ))}
      </div>
    </div>
    </>
  );
};

export default CarouselCards;

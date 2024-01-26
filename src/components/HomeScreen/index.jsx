import React, { useState, useEffect } from 'react'
import CarouselCards from '../CarouselCards'
import NewsImage from '../../assets/images/home-news-img.jpeg'
import { useData } from '../../App'
import SwiperCarousel from '../SwiperCarousel'

const HomeScreen = () => {
  const { companyNewsData } = useData()
  const [selectedCompanyNews, setSelectedCompanyNews] = useState(null);

  useEffect(() => {
    if (companyNewsData && companyNewsData[0]?.news_list && companyNewsData[0].news_list.length > 0) {
      setSelectedCompanyNews(companyNewsData);
    }
  }, [companyNewsData]);

  if (!selectedCompanyNews) {
    return <p>Loading...</p>; // Add a loading indicator while data is being fetched
  }

  const firstNews = selectedCompanyNews[0].news_list[0];

  return (
    <div className='home-screen-wrapper'>
      <header className='home-screen-header'>
        <h2 className='title-type-2'>Welcome back!</h2>
        <h1 className='title-type-1'>Jamzidi Khalid</h1>
      </header>

      <main className='home-screen-content'>
        {/* News section */}
        <section className='news-section'>
          <div className='news-image-wrapper'>
            <img src={firstNews?.image_url} alt='home-news-img' />
          </div>
          <div className='news-content-wrapper'>
            {/* <h2 className='title-type-1 mb-3'> Petronas secures production sharing contract extension</h2> */}
            <h2 className='title-type-1 mb-3'>{firstNews?.title}</h2>
            <p className='para-type-1'>{firstNews?.summary}</p>
            {/* <p className='para-type-1'>PC Ketapang II Ltd. (PCK2L), a subsidiary of PETRONAS, has secured the 20-year extension of the
              Production Sharing Contract (PSC) for the Ketapang Working Area, located in the Java Sea. Due to
              expire in 2028, the Ketapang PSC extension was officially granted by the Government of Indonesia
              through the Ministry of Energy and Mineral Resources on 22 December 2023 with the same composition
              of participating interests.
            </p>
            <p className='para-type-1 mt-3'>
              Executive Vice President and Chief Executive Officer of Upstream PETRONAS, Datuk Adif Zulkifli said,
              “We are grateful to the Government of Indonesia for the PSC extension, which will allow PETRONAS to
              continue leveraging our strong portfolio in Indonesia, through our key strategic projects that we have
              planned for the Ketapang Working Area.”
            </p> */}
          </div>
        </section>

        <div className='hr-wrap px-4'><hr className='m-0' /></div>

        {/* Image carousel */}
        <section className='reviews-section'>
          <h2 className='title-type-3'>My Reviews</h2>

          <div className='carousel-wrapper'>
            {/* <CarouselCards /> */}
            <SwiperCarousel />
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomeScreen

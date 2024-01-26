import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, EffectFade } from 'swiper/modules';
import { useData } from '../../App';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './SwiperCarousel.scss';

const SwiperCarousel = () => {
    const { companyData } = useData();

    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 7,
                slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="doc-swiper cards"
        >
            {companyData && companyData.map((slide) => (
                <SwiperSlide key={slide.id} className='card card-wrapper'>
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
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperCarousel;

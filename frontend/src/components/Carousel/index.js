import "./index.css";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import React from "react";
import styled from "styled-components";


export const PostImage = styled.img`
  cursor: pointer;
`

const Carousel = (props) => {
    const {
        images,
    } = props


    let renderImages
    if (images) {
        renderImages = images.map((url, index) => (
            <PostImage key={index} src={url}/>
        ));
    }


    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
        <div className="App">
            <Slider {...settings}>
                {renderImages}
            </Slider>
        </div>
    )
}

export default Carousel

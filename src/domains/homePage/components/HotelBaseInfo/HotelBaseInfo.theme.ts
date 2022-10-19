import styled from 'styled-components'
import { MOBILE_MEDIA_QUERY_WIDTH } from '../../constants/constants'

export const ImageGalleryWrapper = styled.div`
  .image-gallery-image {
    width: 200px;
    height: 200px;
    object-fit: cover;

    @media only screen and (max-width: ${MOBILE_MEDIA_QUERY_WIDTH}) {
      width: 100%;
      height: auto;
    }
  }

  .image-gallery-left-nav .image-gallery-svg,
  .image-gallery-right-nav .image-gallery-svg {
    height: 60px;
    width: 60px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      color: white;
    }
  }

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    padding: 0;
    margin: 0;
  }
`

export const HotelBaseInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
`
export const ImageAndInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${MOBILE_MEDIA_QUERY_WIDTH}) {
    flex-direction: column;
  }
`

export const TypographyWrapper = styled.div`
  margin: 10px 0;

  @media only screen and (min-width: 768px) {
    margin: 0 0 0 10px;
  }
`

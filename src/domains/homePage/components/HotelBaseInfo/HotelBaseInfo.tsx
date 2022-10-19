import { Rating, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import type { Image, MergedHotelWithDetailsType } from '../../types/types'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'
import {
  ImageGalleryWrapper,
  HotelBaseInfoWrapper,
  ImageAndInfoWrapper,
  TypographyWrapper,
} from './HotelBaseInfo.theme'

const HotelBaseInfo = ({ hotel }: { hotel: MergedHotelWithDetailsType }) => {
  const getImageGallerySet = useCallback(() => {
    const hotelRoomsImages = hotel.rooms
      .map((hotelRoom) => hotelRoom.images.map((image: Image) => image))
      .flat()

    const hotelBaseImagesWithRoomsImages = [
      ...hotel.images,
      ...hotelRoomsImages,
    ]
      .map((image: Image, index, array) => {
        //needed to achieve slider also for hotels with only one image
        const imageAlt = image?.alt || 'Hotel image'

        if (array.length === 1) {
          return [
            {
              original: image.url,
              originalAlt: imageAlt,
            },
            {
              original: image.url,
              originalAlt: imageAlt,
            },
          ]
        } else {
          return {
            original: image.url,
            originalAlt: imageAlt,
          }
        }
      })
      .flat()

    return hotelBaseImagesWithRoomsImages
  }, [hotel.images, hotel.rooms])

  //TODO: image gallery jako osobny komponent?
  return (
    <HotelBaseInfoWrapper>
      <ImageAndInfoWrapper>
        <ImageGalleryWrapper>
          <ImageGallery
            infinite={true}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={getImageGallerySet()}
          />
        </ImageGalleryWrapper>
        <TypographyWrapper>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.name}
          </Typography>
          <Typography color="text.secondary">{hotel.address1}</Typography>
          {hotel.address2 && (
            <Typography color="text.secondary">{hotel.address2}</Typography>
          )}
        </TypographyWrapper>
      </ImageAndInfoWrapper>
      <Rating name="read-only" value={parseInt(hotel.starRating)} readOnly />
    </HotelBaseInfoWrapper>
  )
}

export default HotelBaseInfo

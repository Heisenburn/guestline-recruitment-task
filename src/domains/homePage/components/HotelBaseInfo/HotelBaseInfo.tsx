import { Rating, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import type { Image, MergedHotelWithDetailsType } from '../../types/types'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'
import { ImageGalleryWrapper } from './HotelBaseInfo.theme'

const HotelBaseInfo = (
  { hotel }: { hotel: MergedHotelWithDetailsType },
  key: string,
) => {
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

  return (
    <div
      key={key}
      style={{
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <ImageGalleryWrapper>
        <ImageGallery
          infinite={true}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={getImageGallerySet()}
        />
      </ImageGalleryWrapper>

      <Typography gutterBottom variant="h5" component="div">
        {hotel.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {hotel.address1}
      </Typography>
      <Rating name="read-only" value={parseInt(hotel.starRating)} readOnly />
    </div>
  )
}

export default HotelBaseInfo

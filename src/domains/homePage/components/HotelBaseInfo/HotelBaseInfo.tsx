import { Card, CardContent, Rating, Typography } from '@mui/material'
import React from 'react'
import type { Image, MergedHotelWithDetailsType } from '../../types/types'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'
import { ImageGalleryWrapper } from './HotelBaseInfo.theme'

const HotelBaseInfo = (
  { hotel }: { hotel: MergedHotelWithDetailsType },
  key: string,
) => {
  const hotelRoomsImages = hotel.rooms
    .map((hotelRoom) => hotelRoom.images.map((image: Image) => image))
    .flat()

  const hotelBaseImagesWithRoomsImages = [
    ...hotel.images,
    ...hotelRoomsImages,
  ].map((image) => {
    return {
      original: image.url,
    }
  })

  return (
    <Card key={key} sx={{ margin: '10px 0' }}>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <ImageGalleryWrapper>
          <ImageGallery
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={hotelBaseImagesWithRoomsImages}
          />
        </ImageGalleryWrapper>

        <Typography gutterBottom variant="h5" component="div">
          {hotel.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {hotel.address1}
        </Typography>
        <Rating name="read-only" value={parseInt(hotel.starRating)} readOnly />
      </CardContent>
    </Card>
  )
}

export default HotelBaseInfo

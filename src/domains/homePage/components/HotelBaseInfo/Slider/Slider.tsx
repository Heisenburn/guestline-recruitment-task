import { ImageGalleryWrapper } from '../HotelBaseInfo.theme'
import ImageGallery from 'react-image-gallery'
import React, { useCallback } from 'react'
import type { Image } from '../../../types/types'
import 'react-image-gallery/styles/css/image-gallery.css'
import type { MergedHotelWithDetailsType } from '../../../types/types'

export const Slider = ({ hotel }: { hotel: MergedHotelWithDetailsType }) => {
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
    <ImageGalleryWrapper>
      <ImageGallery
        infinite={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        items={getImageGallerySet()}
      />
    </ImageGalleryWrapper>
  )
}

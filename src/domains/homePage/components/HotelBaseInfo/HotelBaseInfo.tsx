import { Rating, Typography } from '@mui/material'
import React from 'react'
import type { MergedHotelWithDetailsType } from '../../types/types'
import {
  HotelBaseInfoWrapper,
  ImageAndInfoWrapper,
  TypographyWrapper,
} from './HotelBaseInfo.theme'
import { Slider } from './Slider/Slider'

const HotelBaseInfo = ({ hotel }: { hotel: MergedHotelWithDetailsType }) => {
  return (
    <HotelBaseInfoWrapper>
      <ImageAndInfoWrapper>
        <Slider hotel={hotel} />
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

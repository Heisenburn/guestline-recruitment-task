import { Card, CardContent, Rating, Typography } from '@mui/material'
import React from 'react'
import type { MergedHotelWithDetailsType } from '../../types/types'

const HotelBaseInfo = (
  { hotel }: { hotel: MergedHotelWithDetailsType },
  key: string,
) => {
  return (
    <Card key={key} sx={{ margin: '10px 0' }}>
      <CardContent>
        <p>Tutaj galeria zdjec</p>
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

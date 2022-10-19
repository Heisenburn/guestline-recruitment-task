import type { MergedHotelWithDetailsType } from '../../types/types'
import React, { useEffect, useState } from 'react'
import { CardContent, Typography } from '@mui/material'
import HotelBaseInfo from '../HotelBaseInfo/HotelBaseInfo'
import { HotelRoomsInfo } from '../HotelRoomsInfo/HotelRoomsInfo'
import { HotelListingContainer, StyledCard } from './HotelListing.theme'
import getDataAfterFilteringByRating from '../../helpers/getDataAfterFilteringByRating'
import { getDataAfterFilteringHotelsByOccupancy } from '../../helpers/getDataAfterFilteringHotelsByOccupancy'

interface Props {
  data: MergedHotelWithDetailsType[]
  numberOfChildren: number
  numberOfAdults: number
  selectedRating: number | null
}

export const HotelListing = ({
  data,
  numberOfChildren,
  numberOfAdults,
  selectedRating,
}: Props): JSX.Element => {
  const [listingItems, setListingItems] = useState(data)

  useEffect(() => {
    let hotelsMatchingRatingFilter = data
    if (selectedRating) {
      hotelsMatchingRatingFilter = getDataAfterFilteringByRating(
        data,
        selectedRating,
      )
    }

    const hotelsMatchingOccupancyFilter =
      getDataAfterFilteringHotelsByOccupancy(
        hotelsMatchingRatingFilter,
        numberOfAdults,
        numberOfChildren,
      )
    setListingItems(hotelsMatchingOccupancyFilter)
  }, [data, numberOfAdults, numberOfChildren, selectedRating])

  return (
    <HotelListingContainer>
      {
        listingItems.length > 0 ? (
          listingItems.map((hotel) => (
            <StyledCard key={hotel.id}>
              <CardContent>
                <HotelBaseInfo hotel={hotel} />
                {hotel.rooms.map((room) => (
                  <HotelRoomsInfo room={room} key={room.id} />
                ))}
              </CardContent>
            </StyledCard>
          ))
        ) : (
          <Typography variant="h5">
            No results... Try changing filters
          </Typography>
        )
        //Todo: tu mógłby być button z czyszczeniem filtrów
        //TODO: i też czyszczenie filtrów mogłoby się pojawiać po 1szym ustawieniu filtra jakiekolwiek
      }
    </HotelListingContainer>
  )
}

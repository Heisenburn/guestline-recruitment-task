import type { MergedHotelWithDetailsType } from '../../types/types'
import React, { useEffect, useState } from 'react'
import { CardContent, Typography } from '@mui/material'
import HotelBaseInfo from '../HotelBaseInfo/HotelBaseInfo'
import { HotelRoomsInfo } from '../HotelRoomsInfo/HotelRoomsInfo'
import { HotelListingContainer, StyledCard } from './HotelListing.theme'

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
    //todo: tutaj można byłoby powyciągąć do funkcji helpery
    let hotelsMatchingRatingFilter = data

    if (selectedRating) {
      hotelsMatchingRatingFilter = data.filter(
        (hotel) => selectedRating <= parseInt(hotel.starRating),
      )
      //sort by ratingNumber from lowest to highest (not in the requirements but improves UX)
      hotelsMatchingRatingFilter = hotelsMatchingRatingFilter.sort(
        (hotelA, hotelB) =>
          parseInt(hotelA.starRating) - parseInt(hotelB.starRating),
      )
    }

    const hotelsMatchingOccupancyFilter: MergedHotelWithDetailsType[] = []

    /* Important note: API should always return maxOverall, for hotel ID 3 and 4 it doest not
    therefore I am doing calculation of maxOverall on FE */
    hotelsMatchingRatingFilter.forEach((hotel) => {
      const filteredRooms = hotel.rooms.filter(
        ({ occupancy }) =>
          numberOfAdults <= occupancy.maxAdults &&
          numberOfChildren <= occupancy.maxChildren &&
          //maxOverall below
          numberOfAdults + numberOfChildren <=
            occupancy.maxAdults + occupancy.maxChildren,
      )
      if (filteredRooms.length > 0) {
        hotelsMatchingOccupancyFilter.push({
          ...hotel,
          rooms: filteredRooms,
        })
      }
    })

    setListingItems(hotelsMatchingOccupancyFilter)
  }, [data, numberOfAdults, numberOfChildren, selectedRating])

  return listingItems.length > 0 ? (
    <HotelListingContainer>
      {listingItems.map((hotel) => (
        <StyledCard key={hotel.id}>
          <CardContent>
            <HotelBaseInfo hotel={hotel} />
            {hotel.rooms.map((room) => (
              <HotelRoomsInfo room={room} key={room.id} />
            ))}
          </CardContent>
        </StyledCard>
      ))}
    </HotelListingContainer>
  ) : (
    <Typography variant="h3">No results... Try changing filters</Typography>
    //Todo: tu mógłby być button z czyszczeniem filtrów
    //TODO: i też czyszczenie filtrów mogłoby się pojawiać po 1szym ustawieniu filtra jakiekolwiek
  )
}

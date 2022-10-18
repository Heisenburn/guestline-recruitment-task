import type { MergedHotelWithDetailsType } from '../types/types'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import HotelBaseInfo from './HotelBaseInfo/HotelBaseInfo'
import { HotelRoomsInfo } from './HotelRoomsInfo/HotelRoomsInfo'

//TODO: View all images of the displayed hotel
//TODO:  See hotel details (including hotel name, address and star rating) and room details (including room type, max adults, max children and long description)

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {listingItems.map((hotel) => (
        <Card key={hotel.id} sx={{ margin: '10px', width: '90%' }}>
          <CardContent>
            <HotelBaseInfo hotel={hotel} key={hotel.id} />
            {hotel.rooms.map((room) => (
              <HotelRoomsInfo room={room} key={room.id} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <Typography variant="h3">No results... Try changing filters</Typography>
    //Todo: tu mógłby być button z czyszczeniem filtrów
  )
}

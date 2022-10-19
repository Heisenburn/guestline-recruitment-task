import type { MergedHotelWithDetailsType } from '../../types/types'
import React, { useEffect, useState } from 'react'
import { CardContent, Typography } from '@mui/material'
import HotelBaseInfo from '../HotelBaseInfo/HotelBaseInfo'
import { HotelRoomsInfo } from '../HotelRoomsInfo/HotelRoomsInfo'
import {
  HotelListingContainer,
  StyledCard,
  StyledButton,
} from './HotelListing.theme'
import getDataAfterFilteringByRating from '../../helpers/getDataAfterFilteringByRating'
import { getDataAfterFilteringHotelsByOccupancy } from '../../helpers/getDataAfterFilteringHotelsByOccupancy'
import { FiltersType } from '../../types/types'
import { DEFAULT_FILTER_VALUES } from '../../constants/constants'

interface Props {
  data: MergedHotelWithDetailsType[]
  selectedFilters: FiltersType
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

export const HotelListing = ({
  data,
  selectedFilters,
  setSelectedFilters,
}: Props): JSX.Element => {
  const [listingItems, setListingItems] = useState(data)

  useEffect(() => {
    const { selectedRating, numberOfChildren, numberOfAdults } = selectedFilters

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
  }, [data, selectedFilters])

  return (
    <HotelListingContainer>
      {listingItems.length > 0 ? (
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
        <>
          <Typography variant="h5">
            No results... Try changing filters
          </Typography>
          <StyledButton
            variant="outlined"
            onClick={() => setSelectedFilters(DEFAULT_FILTER_VALUES)}
          >
            Reset filters
          </StyledButton>
        </>
      )}
    </HotelListingContainer>
  )
}

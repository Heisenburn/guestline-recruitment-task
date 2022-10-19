import { Rating, Typography } from '@mui/material'
import type { FiltersType } from '../../../types/types'
import React from 'react'
import { RatingWrapper } from '../Filters.theme'

interface Props {
  selectedRating: FiltersType['selectedRating']
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}
export const RatingComponent = ({
  selectedRating,
  setSelectedFilters,
}: Props) => {
  return (
    <RatingWrapper>
      <Typography>Rating: </Typography>
      <Rating
        value={selectedRating}
        onChange={(event, newValue) => {
          setSelectedFilters((prevState: FiltersType) => {
            return {
              ...prevState,
              selectedRating: newValue,
            }
          })
        }}
      />
    </RatingWrapper>
  )
}

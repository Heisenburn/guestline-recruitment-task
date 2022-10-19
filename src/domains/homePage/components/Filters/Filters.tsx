import React from 'react'
import { Typography, Rating } from '@mui/material'
import {
  CounterWrapper,
  FiltersWrapper,
  RatingWrapper,
  StyledButton,
} from './Filters.theme'

interface Props {
  setNumberOfChildren: React.Dispatch<React.SetStateAction<number>>
  setNumberOfAdults: React.Dispatch<React.SetStateAction<number>>
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>
  numberOfChildren: number
  numberOfAdults: number
  selectedRating: number | null
}

const Filters = ({
  setNumberOfChildren,
  setNumberOfAdults,
  setSelectedRating,
  numberOfChildren,
  numberOfAdults,
  selectedRating,
}: Props) => {
  return (
    <FiltersWrapper>
      <RatingWrapper>
        <Typography>Rating: </Typography>
        <Rating
          value={selectedRating}
          onChange={(event, newValue) => {
            setSelectedRating(newValue)
          }}
        />
      </RatingWrapper>
      <CounterWrapper>
        <Typography>Adults: </Typography>
        <StyledButton
          variant="outlined"
          //TODO: obsłużenie ujemnych wartości
          onClick={() => setNumberOfAdults((prevState) => prevState - 1)}
          size="small"
        >
          -
        </StyledButton>
        <Typography>{numberOfAdults} </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => setNumberOfAdults((prevState) => prevState + 1)}
          size="small"
        >
          +
        </StyledButton>
      </CounterWrapper>
      <CounterWrapper>
        <Typography>Children: </Typography>
        <StyledButton
          variant="outlined"
          //TODO: obsłużenie ujemnych wartości
          onClick={() => setNumberOfChildren((prevState) => prevState - 1)}
          size="small"
        >
          -
        </StyledButton>
        <Typography variant="caption">{numberOfChildren} </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => setNumberOfChildren((prevState) => prevState + 1)}
          size="small"
        >
          +
        </StyledButton>
      </CounterWrapper>
    </FiltersWrapper>
  )
}

export default Filters

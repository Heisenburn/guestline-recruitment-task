import React from 'react'
import { Typography, Rating } from '@mui/material'
import {
  CounterWrapper,
  FiltersWrapper,
  RatingWrapper,
  StyledButton,
} from './Filters.theme'
import { FiltersType } from '../../types/types'

interface Props {
  selectedFilters: FiltersType
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const Filters = ({ selectedFilters, setSelectedFilters }: Props) => {
  const { numberOfAdults, numberOfChildren, selectedRating } = selectedFilters

  return (
    <FiltersWrapper>
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
      <CounterWrapper>
        <Typography>Adults: </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => {
            setSelectedFilters((prevState: FiltersType) => {
              const numberOfAdultsAfterDecrementing =
                prevState.numberOfAdults == 0 ? 0 : prevState.numberOfAdults - 1

              return {
                ...prevState,
                numberOfAdults: numberOfAdultsAfterDecrementing,
              }
            })
          }}
          size="small"
        >
          -
        </StyledButton>
        <Typography>{numberOfAdults} </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => {
            //todo: może wynieśc do wspólne funkcji dla odejmowania i dodawania?
            //todo: całe komponenty się powtarzają
            setSelectedFilters((prevState: FiltersType) => {
              return {
                ...prevState,
                numberOfAdults: prevState.numberOfAdults + 1,
              }
            })
          }}
          size="small"
        >
          +
        </StyledButton>
      </CounterWrapper>
      <CounterWrapper>
        <Typography>Children: </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => {
            setSelectedFilters((prevState: FiltersType) => {
              const numberOfChildrenAfterDecrementing =
                prevState.numberOfChildren == 0
                  ? 0
                  : prevState.numberOfChildren - 1

              return {
                ...prevState,
                numberOfChildren: numberOfChildrenAfterDecrementing,
              }
            })
          }}
          size="small"
        >
          -
        </StyledButton>
        <Typography variant="caption">{numberOfChildren} </Typography>
        <StyledButton
          variant="outlined"
          onClick={() => {
            setSelectedFilters((prevState: FiltersType) => {
              return {
                ...prevState,
                numberOfChildren: prevState.numberOfChildren + 1,
              }
            })
          }}
          size="small"
        >
          +
        </StyledButton>
      </CounterWrapper>
    </FiltersWrapper>
  )
}

export default Filters

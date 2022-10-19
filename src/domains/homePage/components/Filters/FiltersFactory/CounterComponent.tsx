import { CounterWrapper, StyledButton } from '../Filters.theme'
import { Typography } from '@mui/material'
import type { FiltersFactoryLabel, FiltersType } from '../../../types/types'
import React from 'react'

interface Props {
  label?: FiltersFactoryLabel
  numberOfAdults: number
  numberOfChildren: number
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

export const CounterComponent = ({
  label,
  numberOfAdults,
  numberOfChildren,
  setSelectedFilters,
}: Props) => {
  const counterLabel =
    label === 'Adults' ? 'numberOfAdults' : 'numberOfChildren'

  return (
    <CounterWrapper>
      <Typography>{label}: </Typography>
      <StyledButton
        variant="outlined"
        onClick={() => {
          setSelectedFilters((prevState: FiltersType) => {
            const counterAfterDecrementing =
              prevState[counterLabel] == 0 ? 0 : prevState[counterLabel] - 1

            return {
              ...prevState,
              [counterLabel]: counterAfterDecrementing,
            }
          })
        }}
        size="small"
      >
        -
      </StyledButton>
      <Typography>
        {counterLabel === 'numberOfChildren'
          ? numberOfChildren
          : numberOfAdults}
      </Typography>
      <StyledButton
        variant="outlined"
        onClick={() => {
          setSelectedFilters((prevState: FiltersType) => {
            return {
              ...prevState,
              [counterLabel]: prevState[counterLabel] + 1,
            }
          })
        }}
        size="small"
      >
        +
      </StyledButton>
    </CounterWrapper>
  )
}

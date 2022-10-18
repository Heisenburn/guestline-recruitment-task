import React from 'react'
import { Typography, Rating, Button } from '@mui/material'
import { CounterWrapper, FiltersWrapper } from './Filters.theme'

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FiltersWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption">Rating: </Typography>
          <Rating
            size="small"
            value={selectedRating}
            onChange={(event, newValue) => {
              setSelectedRating(newValue)
            }}
          />
        </div>

        <CounterWrapper>
          <Typography variant="caption">Adults: </Typography>

          <Button
            variant="outlined"
            //TODO: obsłużenie ujemnych wartości
            onClick={() => setNumberOfAdults((prevState) => prevState - 1)}
            size="small"
            style={{ minWidth: '20px', margin: '0 10px' }}
          >
            -
          </Button>
          <Typography variant="caption">{numberOfAdults} </Typography>
          <Button
            variant="outlined"
            onClick={() => setNumberOfAdults((prevState) => prevState + 1)}
            size="small"
            style={{ minWidth: '20px', margin: '0 10px' }}
          >
            +
          </Button>
        </CounterWrapper>

        <CounterWrapper>
          <Typography variant="caption">Children: </Typography>
          <Button
            variant="outlined"
            //TODO: obsłużenie ujemnych wartości
            onClick={() => setNumberOfChildren((prevState) => prevState - 1)}
            size="small"
            style={{ minWidth: '20px', margin: '0 10px' }}
          >
            -
          </Button>
          <Typography variant="caption">{numberOfChildren} </Typography>
          <Button
            variant="outlined"
            onClick={() => setNumberOfChildren((prevState) => prevState + 1)}
            size="small"
            style={{ minWidth: '20px', margin: '0 10px' }}
          >
            +
          </Button>
        </CounterWrapper>
      </FiltersWrapper>
    </div>
  )
}

export default Filters

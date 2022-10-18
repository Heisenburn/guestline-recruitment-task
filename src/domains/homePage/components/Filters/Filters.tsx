import React from 'react'
import { Typography, Rating, Button } from '@mui/material'

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
  const handleResetButton = () => {
    setNumberOfChildren(0)
    setNumberOfAdults(0)
    setSelectedRating(null)
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
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

        <div>
          <Typography variant="caption">Adults: </Typography>

          <Button
            variant="outlined"
            //TODO: obsłużenie ujemnych wartości
            onClick={() => setNumberOfAdults((prevState) => prevState - 1)}
            size="small"
            style={{ minWidth: '20px' }}
          >
            -
          </Button>
          <Typography variant="caption">{numberOfAdults} </Typography>
          <Button
            variant="outlined"
            onClick={() => setNumberOfAdults((prevState) => prevState + 1)}
            size="small"
            style={{ minWidth: '20px' }}
          >
            +
          </Button>
        </div>

        <div>
          <Typography variant="caption">Children: </Typography>
          <Button
            variant="outlined"
            //TODO: obsłużenie ujemnych wartości
            onClick={() => setNumberOfChildren((prevState) => prevState - 1)}
            size="small"
            style={{ minWidth: '20px' }}
          >
            -
          </Button>
          <Typography variant="caption">{numberOfChildren} </Typography>
          <Button
            variant="outlined"
            onClick={() => setNumberOfChildren((prevState) => prevState + 1)}
            size="small"
            style={{ minWidth: '20px' }}
          >
            +
          </Button>
        </div>
      </div>
      <button style={{ margin: '10px 0' }} onClick={handleResetButton}>
        Reset filters
      </button>
    </div>
  )
}

export default Filters

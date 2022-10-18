import React from 'react'
import { Typography, Rating } from '@mui/material'

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
      <div>
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
          <p>Adults: {numberOfAdults}</p>
          <button
            onClick={() => setNumberOfAdults((prevState) => prevState + 1)}
          >
            +
          </button>
          <button
            onClick={() => setNumberOfAdults((prevState) => prevState - 1)}
          >
            -
          </button>
        </div>

        <p>Children: {numberOfChildren}</p>
        <button
          onClick={() => setNumberOfChildren((prevState) => prevState + 1)}
        >
          +
        </button>
        <button
          onClick={() => setNumberOfChildren((prevState) => prevState - 1)}
        >
          -
        </button>
      </div>
      <button onClick={handleResetButton}>Reset filters</button>
    </div>
  )
}

export default Filters

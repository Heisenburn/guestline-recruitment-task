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
      <button onClick={handleResetButton}>Reset filters</button>

      <div>
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
      <div>
        <p>Adults: {numberOfAdults}</p>
        <button onClick={() => setNumberOfAdults((prevState) => prevState + 1)}>
          +
        </button>
        <button onClick={() => setNumberOfAdults((prevState) => prevState - 1)}>
          -
        </button>
      </div>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={selectedRating}
        onChange={(event, newValue) => {
          setSelectedRating(newValue)
        }}
      />
      {/*<p>selectedRating: {selectedRating}</p>*/}
      {/*{[1, 2, 3, 4, 5].map((ratingNumber) => {*/}
      {/*  return (*/}
      {/*    <button*/}
      {/*      onClick={() => setSelectedRating(ratingNumber)}*/}
      {/*      key={ratingNumber}*/}
      {/*    >*/}
      {/*      {ratingNumber}*/}
      {/*    </button>*/}
      {/*  )*/}
      {/*})}*/}
    </div>
  )
}

export default Filters

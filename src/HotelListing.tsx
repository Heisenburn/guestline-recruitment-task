import type { MergedHotelWithDetailsType, Occupancy } from './types'
import React, { useCallback, useEffect, useState } from 'react'

// Filter based on the star rating of the hotel, that is, given I have selected 3 stars, then I am able to see all hotels with a 3 and above rating.
// Filter based on the capacity of the room. That is, when I have selected 1 adult and 1 child then I am able to see all rooms with at least that capacity. Therefore, I will not be shown any rooms which do not accept children.
// View all images of the displayed hotel
//TODO:  See hotel details (including hotel name, address and star rating) and room details (including room type, max adults, max children and long description)

export const HotelListing = ({
  data,
}: {
  data: MergedHotelWithDetailsType[]
}): JSX.Element => {
  const [listingItems, setListingItems] = useState(data)
  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [numberOfAdults, setNumberOfAdults] = useState(0)

  const handleRatingClick = useCallback(
    (selectedRating: string) => {
      const hotelsFilteredByRating = listingItems.filter(
        (hotel) => parseInt(selectedRating) == parseInt(hotel.starRating),
      )

      setListingItems(hotelsFilteredByRating)
    },
    [listingItems],
  )

  const handleResetButton = () => {
    setListingItems(data)
  }

  useEffect(() => {
    const hotelsMatchingRatingFilter = listingItems.filter((hotel) =>
      hotel.rooms.find(
        ({ occupancy }) =>
          numberOfAdults <= occupancy.maxAdults &&
          numberOfChildren <= occupancy.maxChildren &&
          numberOfChildren + numberOfAdults <= occupancy.maxOverall,
      ),
    )

    console.log({ hotelsMatchingRatingFilter })
    const hotelsMatchingRatingFilterWithFilteredRooms =
      hotelsMatchingRatingFilter.filter(
        (hotel) =>
          (hotel.rooms = hotel.rooms.filter(
            ({ occupancy }) =>
              occupancy.maxOverall <= 2 && occupancy.maxAdults <= 2,
          )),
      )

    setListingItems(hotelsMatchingRatingFilterWithFilteredRooms)
  }, [numberOfAdults, numberOfChildren])

  return (
    <>
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
      <p>Rating:</p>
      {['1', '2', '3', '4', '5'].map((ratingNumber) => {
        return (
          <button
            onClick={() => handleRatingClick(ratingNumber)}
            key={ratingNumber}
          >
            {ratingNumber}
          </button>
        )
      })}
      <div style={{ display: 'flex' }}>
        {listingItems.map((hotel) => {
          return (
            <div
              key={hotel.id}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                width: '250px',
              }}
            >
              <p>{hotel.name}</p>
              {/*<p>Adress: {hotel.address1}</p>*/}
              {/*{hotel.address2 ? <p>Adress: {hotel.address2}</p> : null}*/}
              {/*<p>{hotel.description}</p>*/}
              <p>
                <strong>starRating:</strong> {hotel.starRating}
              </p>
              {hotel.rooms.map((details) => {
                return (
                  <div
                    key={details.id}
                    style={{ border: '1px dotted black', marginLeft: '10px' }}
                  >
                    {/*<p>{details.name}</p>*/}
                    {/*<p>{details.bedConfiguration}</p>*/}
                    {/*<p>{details.longDescription}</p>*/}
                    {Object.keys(details.occupancy).map(
                      (occupancyKey, index) => {
                        return (
                          <p key={index}>
                            {occupancyKey}:
                            {details.occupancy[occupancyKey as keyof Occupancy]}
                          </p>
                        )
                      },
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

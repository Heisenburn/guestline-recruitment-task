import type { MergedHotelWithDetailsType, Occupancy } from './types'
import React, { useEffect, useState } from 'react'

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
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const handleResetButton = () => {
    setListingItems(data)
    setNumberOfChildren(0)
    setNumberOfAdults(0)
    setSelectedRating(null)
  }

  useEffect(() => {
    let hotelsMatchingRatingFilter = data

    if (selectedRating) {
      hotelsMatchingRatingFilter = data.filter(
        (hotel) => selectedRating <= parseInt(hotel.starRating),
      )
    }

    /* Important note: API should always return maxOverall, for hotel ID 3 and 4 it doest not
 therefore I am doing calculation of maxOverall on FE */
    const hotelsMatchingOccupancyFilter = hotelsMatchingRatingFilter.filter(
      (hotel) =>
        hotel.rooms.find(
          ({ occupancy }) =>
            numberOfAdults <= occupancy.maxAdults &&
            numberOfChildren <= occupancy.maxChildren &&
            numberOfAdults + numberOfChildren <=
              occupancy.maxAdults + occupancy.maxChildren,
        ),
    )

    const hotelsMatchingRatingFilterWithFilteredRooms =
      hotelsMatchingOccupancyFilter.filter(
        (hotel) =>
          (hotel.rooms = hotel.rooms.filter(
            ({ occupancy }) =>
              numberOfAdults <= occupancy.maxAdults &&
              numberOfChildren <= occupancy.maxChildren &&
              numberOfAdults + numberOfChildren <=
                occupancy.maxAdults + occupancy.maxChildren,
          )),
      )

    setListingItems(hotelsMatchingRatingFilterWithFilteredRooms)
  }, [data, numberOfAdults, numberOfChildren, selectedRating])

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
      <p>selectedRating: {selectedRating}</p>
      {[1, 2, 3, 4, 5].map((ratingNumber) => {
        return (
          <button
            onClick={() => setSelectedRating(ratingNumber)}
            key={ratingNumber}
          >
            {ratingNumber}
          </button>
        )
      })}
      <div style={{ display: 'flex' }}>
        {listingItems.length > 0 ? (
          listingItems.map((hotel) => {
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
                          return occupancyKey != 'maxOverall' ? (
                            <p key={index}>
                              {occupancyKey}:
                              {
                                details.occupancy[
                                  occupancyKey as keyof Occupancy
                                ]
                              }
                            </p>
                          ) : null
                        },
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : (
          <p>No results... Try changing filters</p>
        )}
      </div>
    </>
  )
}

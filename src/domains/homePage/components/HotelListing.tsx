import type { MergedHotelWithDetailsType, Occupancy } from '../types/types'
import React, { useEffect, useState } from 'react'

//TODO: View all images of the displayed hotel
//TODO:  See hotel details (including hotel name, address and star rating) and room details (including room type, max adults, max children and long description)

interface Props {
  data: MergedHotelWithDetailsType[]
  numberOfChildren: number
  numberOfAdults: number
  selectedRating: number | null
}

export const HotelListing = ({
  data,
  numberOfChildren,
  numberOfAdults,
  selectedRating,
}: Props): JSX.Element => {
  const [listingItems, setListingItems] = useState(data)

  useEffect(() => {
    let hotelsMatchingRatingFilter = data

    if (selectedRating) {
      hotelsMatchingRatingFilter = data.filter(
        (hotel) => selectedRating <= parseInt(hotel.starRating),
      )
    }

    const hotelsMatchingOccupancyFilter: MergedHotelWithDetailsType[] = []

    /* Important note: API should always return maxOverall, for hotel ID 3 and 4 it doest not
    therefore I am doing calculation of maxOverall on FE */
    hotelsMatchingRatingFilter.forEach((hotel) => {
      const filteredRooms = hotel.rooms.filter(
        ({ occupancy }) =>
          numberOfAdults <= occupancy.maxAdults &&
          numberOfChildren <= occupancy.maxChildren &&
          numberOfAdults + numberOfChildren <=
            occupancy.maxAdults + occupancy.maxChildren,
      )
      if (filteredRooms.length > 0) {
        hotelsMatchingOccupancyFilter.push({
          ...hotel,
          rooms: filteredRooms,
        })
      }
    })

    setListingItems(hotelsMatchingOccupancyFilter)
  }, [data, numberOfAdults, numberOfChildren, selectedRating])

  return (
    <>
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

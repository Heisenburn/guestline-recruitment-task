import { MergedHotelWithDetailsType } from '../types/types'

export const getDataAfterFilteringHotelsByOccupancy = (
  hotelsMatchingRatingFilter: MergedHotelWithDetailsType[],
  numberOfAdults: number,
  numberOfChildren: number,
) => {
  const hotelsMatchingOccupancyFilter: MergedHotelWithDetailsType[] = []

  /* Important note: API should always return maxOverall, for hotel ID 3 and 4 it doest not
  therefore I am doing calculation of maxOverall on FE */
  hotelsMatchingRatingFilter.forEach((hotel) => {
    const filteredRooms = hotel.rooms.filter(
      ({ occupancy }) =>
        numberOfAdults <= occupancy.maxAdults &&
        numberOfChildren <= occupancy.maxChildren &&
        //maxOverall below
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

  return hotelsMatchingOccupancyFilter
}

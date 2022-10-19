import { MergedHotelWithDetailsType } from '../types/types'

const getDataAfterFilteringByRating = (
  data: MergedHotelWithDetailsType[],
  selectedRating: number,
) => {
  const hotelsMatchingRatingFilter = data.filter(
    (hotel) => selectedRating <= parseInt(hotel.starRating),
  )
  //sort by ratingNumber from lowest to highest (not in the requirements but improves UX)
  return hotelsMatchingRatingFilter.sort(
    (hotelA, hotelB) =>
      parseInt(hotelA.starRating) - parseInt(hotelB.starRating),
  )
}

export default getDataAfterFilteringByRating

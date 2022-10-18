import {
  HOTELS_BASIC_DATA_FETCH_URL,
  ROOM_DETAILS_FETCH_URL_PREFIX,
} from '../constants'
import {
  HotelDetailsResponse,
  HotelsRootData,
  MergedHotelWithDetailsType,
} from '../types/types'

export const getHotelsDataMergedWithRoomsDetails = async (): Promise<
  MergedHotelWithDetailsType[] | null
> => {
  try {
    const response = await fetch(HOTELS_BASIC_DATA_FETCH_URL)
    const hotelsRootData: HotelsRootData[] = await response.json()

    //connect root hotel data with its' details
    const mergedDataPromises = hotelsRootData.map((hotelRootItem) =>
      fetch(`${ROOM_DETAILS_FETCH_URL_PREFIX}${hotelRootItem.id}`)
        .then((resp) => resp.json())
        .then((parsedHotelDetails: HotelDetailsResponse) => {
          return {
            ...hotelRootItem,
            ...parsedHotelDetails,
          }
        }),
    )

    Promise.all(mergedDataPromises).then((parsedPromises) => {
      return parsedPromises
    })
  } catch (error) {
    console.warn(error)
  }
  return null
}

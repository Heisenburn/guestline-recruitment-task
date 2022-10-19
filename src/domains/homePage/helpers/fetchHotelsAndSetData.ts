import {
  HOTELS_BASIC_DATA_FETCH_URL,
  ROOM_DETAILS_FETCH_URL_PREFIX,
} from '../constants/constants'
import type {
  HotelDetailsResponse,
  HotelsRootData,
  MergedHotelWithDetailsType,
} from '../types/types'
import React from 'react'

export const fetchHotelsAndSetData = async (
  setData: React.Dispatch<
    React.SetStateAction<MergedHotelWithDetailsType[] | null>
  >,
): Promise<void> => {
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
      setData(parsedPromises)
    })
  } catch (error) {
    console.warn(error)
  }
}

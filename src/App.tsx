import React, { useEffect, useState } from 'react'
import {
  HotelDetailsResponse,
  HotelsRootData,
  MergedHotelWithDetailsType,
} from './types'
import { HotelListing } from './HotelListing'

const HOTELS_BASIC_DATA_FETCH_URL =
  'https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG'
const ROOM_DETAILS_FETCH_URL_PREFIX =
  'https://obmng.dbm.guestline.net/api/roomRates/OBMNG/'

const App = (): JSX.Element => {
  const [data, setData] = useState<MergedHotelWithDetailsType[] | null>(null)

  /*
  Since in this case the data is not updated frequently there is no need to
  fetch it each time the hotels are being filtered (stars, adults/children options selected)
  */
  useEffect(() => {
    const fetchData = async () => {
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

        Promise.all(mergedDataPromises).then((results) => {
          setData(results)
        })
      } catch (error) {
        console.warn(error)
      }
    }

    fetchData()
  }, [])

  return data ? <HotelListing data={data} /> : <p>Loading...</p>
}

export default App

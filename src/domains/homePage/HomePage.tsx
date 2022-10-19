import React, { useEffect, useRef, useState } from 'react'
import { MergedHotelWithDetailsType } from './types/types'
import { HotelListing } from './components/HotelListing/HotelListing'
import { Banner } from './components/Banner/Banner.theme'
import Filters from './components/Filters/Filters'
import { fetchHotelsAndSetData } from './helpers/fetchHotelsAndSetData'
import {
  StyledStack,
  StyledSkeleton,
} from './components/Skeleton/Skeleton.theme'
import { CircularProgress } from '@mui/material'

const HomePage = (): JSX.Element => {
  const [data, setData] = useState<MergedHotelWithDetailsType[] | null>(null)
  /*
  Since in this case the data is not updated frequently there is no need to
  fetch it each time the hotels are being filtered (stars, adults/children options selected)
  */
  const shouldFetch = useRef(true)

  useEffect(() => {
    if (shouldFetch.current) {
      const fetch = async () => {
        await fetchHotelsAndSetData(setData)
      }

      fetch()
      shouldFetch.current = false
    }
  }, [])

  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [numberOfAdults, setNumberOfAdults] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  //todo: co z tym spinerem
  const [shouldDisplayProgress, setShouldDisplayProgress] = useState(false)

  // useEffect(() => {
  //   setShouldDisplayProgress(true)
  // }, [numberOfChildren])

  return (
    <>
      <Banner />
      <Filters
        //TODO: może lepiej jeden stan trzymający wszystkie filtry?
        setNumberOfChildren={setNumberOfChildren}
        setNumberOfAdults={setNumberOfAdults}
        setSelectedRating={setSelectedRating}
        numberOfChildren={numberOfChildren}
        numberOfAdults={numberOfAdults}
        selectedRating={selectedRating}
      />
      {shouldDisplayProgress && (
        <CircularProgress style={{ position: 'relative', left: '50%' }} />
      )}
      {data ? (
        <HotelListing
          data={data}
          numberOfChildren={numberOfChildren}
          numberOfAdults={numberOfAdults}
          selectedRating={selectedRating}
        />
      ) : (
        <StyledStack spacing={1}>
          {/*Estimated number of hotels*/}
          {[1, 2, 3, 4].map((item) => {
            return (
              <StyledSkeleton
                key={item}
                variant="rectangular"
                height={250}
                animation="wave"
              />
            )
          })}
        </StyledStack>
      )}
    </>
  )
}

export default HomePage

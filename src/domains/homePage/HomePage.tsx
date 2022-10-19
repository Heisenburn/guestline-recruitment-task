import React, { useEffect, useRef, useState } from 'react'
import { FiltersType, MergedHotelWithDetailsType } from './types/types'
import { HotelListing } from './components/HotelListing/HotelListing'
import { Banner } from './components/Banner/Banner.theme'
import Filters from './components/Filters/Filters'
import { fetchHotelsAndSetData } from './helpers/fetchHotelsAndSetData'
import {
  StyledStack,
  StyledSkeleton,
} from './components/Skeleton/Skeleton.theme'
import { CircularProgress } from '@mui/material'
import { DEFAULT_FILTER_VALUES } from './constants/constants'

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

  const [selectedFilters, setSelectedFilters] = useState<FiltersType>({
    ...DEFAULT_FILTER_VALUES,
  })

  return (
    <>
      <Banner />
      <Filters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {data ? (
        <HotelListing
          data={data}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
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

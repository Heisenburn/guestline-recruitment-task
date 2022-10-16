import type { MergedHotelWithDetailsType } from './types'
import React from 'react'

export const HotelListing = ({
  data,
}: {
  data: MergedHotelWithDetailsType[]
}): JSX.Element => {
  return (
    <>
      {data.map((item) => {
        return <p key={item.id}>{item.checkInHours}</p>
      })}
    </>
  )
}

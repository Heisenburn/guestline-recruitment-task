import React from 'react'
import type { Occupancy, Room } from '../../types/types'
import { Card } from '@mui/material'

export const HotelRoomsInfo = ({ room }: { room: Room }, key: string) => {
  return (
    <Card key={key}>
      <p>{room.name}</p>
      {Object.keys(room.occupancy).map((occupancyKey, index) => {
        return occupancyKey != 'maxOverall' ? (
          <p key={index}>
            {occupancyKey}:{room.occupancy[occupancyKey as keyof Occupancy]}
          </p>
        ) : null
      })}
    </Card>
  )
}

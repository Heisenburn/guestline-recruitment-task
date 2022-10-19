import React from 'react'
import type { Room } from '../../types/types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const HotelRoomsInfo = ({ room }: { room: Room }, key: string) => {
  return (
    <Accordion key={key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{room.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <strong>Adults:</strong> {room.occupancy.maxAdults}
        </Typography>
        <Typography>
          <strong>Children:</strong> {room.occupancy.maxChildren}
        </Typography>
        <Typography>
          <strong>Type:</strong> {room.bedConfiguration}
        </Typography>
        <Typography>
          <strong>Description:</strong> {room.longDescription}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

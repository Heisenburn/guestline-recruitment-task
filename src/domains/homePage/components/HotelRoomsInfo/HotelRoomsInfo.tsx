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
        <Typography>Adults: {room.occupancy.maxAdults}</Typography>
        <Typography>Children: {room.occupancy.maxChildren}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

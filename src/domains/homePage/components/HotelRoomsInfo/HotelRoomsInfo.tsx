import React from 'react'
import type { Room } from '../../types/types'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { StyledTypography } from './HotelRoomsInfo.theme'

export const HotelRoomsInfo = ({ room }: { room: Room }, key: string) => {
  return (
    <Accordion key={key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledTypography>{room.name}</StyledTypography>
      </AccordionSummary>
      <AccordionDetails>
        <StyledTypography>
          <strong>Adults:</strong> {room.occupancy.maxAdults}
        </StyledTypography>
        <StyledTypography>
          <strong>Children:</strong> {room.occupancy.maxChildren}
        </StyledTypography>
        <StyledTypography>
          <strong>Type:</strong> {room.bedConfiguration}
        </StyledTypography>
        <StyledTypography>
          <strong>Description:</strong> {room.longDescription}
        </StyledTypography>
      </AccordionDetails>
    </Accordion>
  )
}

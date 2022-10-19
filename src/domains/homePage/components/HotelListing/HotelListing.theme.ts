import styled from 'styled-components'
import { Button, Card } from '@mui/material'
import { MOBILE_MEDIA_QUERY_WIDTH } from '../../constants/constants'

export const HotelListingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledCard = styled(Card)`
  margin: 10px;
  width: 70%;

  @media only screen and (max-width: ${MOBILE_MEDIA_QUERY_WIDTH}) {
    width: 90%;
  }
`

export const StyledButton = styled(Button)`
  //!important needed to overwrite lib styles
  margin-top: 10px !important;
`

import styled from 'styled-components'
import { Button } from '@mui/material'
import { MOBILE_MEDIA_QUERY_WIDTH } from '../../constants/constants'

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 500px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  bottom: 75px;
  background-color: white;
  max-width: 650px;
  min-height: 75px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px;
  padding: 20px;
  margin: 20px;

  @media only screen and (max-width: ${MOBILE_MEDIA_QUERY_WIDTH}) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    left: 0;
    transform: translateX(0);
  }
`
export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  & > button {
    width: 30px;
  }
`

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyledButton = styled(Button)`
  //!important needed to overwrite styles from lib
  min-width: 20px !important;
  margin: 0 10px !important;
`

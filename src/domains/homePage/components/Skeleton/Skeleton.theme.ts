import styled from 'styled-components'
import { Skeleton, Stack } from '@mui/material'

export const StyledStack = styled(Stack)`
  display: flex;
  align-items: center;
`

export const StyledSkeleton = styled(Skeleton)`
  border-radius: 10px;
  width: 90%;
  height: 250px;
`

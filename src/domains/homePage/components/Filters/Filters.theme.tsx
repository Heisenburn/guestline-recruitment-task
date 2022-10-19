import styled from 'styled-components'

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 500px;
  position: relative;
  bottom: 75px;
  background-color: white;
  max-width: 650px;
  min-height: 75px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px;
  padding: 20px;
  margin: 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`
export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  & > button {
    width: 30px;
  }
`

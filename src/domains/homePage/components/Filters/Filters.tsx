import React from 'react'
import { FiltersWrapper } from './Filters.theme'
import { FiltersType } from '../../types/types'
import { FiltersFactory } from './FiltersFactory/FiltersFactory'

interface Props {
  selectedFilters: FiltersType
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const Filters = ({ selectedFilters, setSelectedFilters }: Props) => {
  return (
    <FiltersWrapper>
      <FiltersFactory
        type={'rating'}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <FiltersFactory
        type={'counter'}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        label={'Adults'}
      />
      <FiltersFactory
        type={'counter'}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        label={'Children'}
      />
    </FiltersWrapper>
  )
}

export default Filters

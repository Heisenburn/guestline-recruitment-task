import type {
  FiltersFactoryLabel,
  FiltersFactoryType,
  FiltersType,
} from '../../../types/types'
import React from 'react'
import { RatingComponent } from './RatingComponent'
import { CounterComponent } from './CounterComponent'

export const FiltersFactory = ({
  type,
  label,
  selectedFilters,
  setSelectedFilters,
}: {
  type: FiltersFactoryType
  label?: FiltersFactoryLabel
  selectedFilters: FiltersType
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}) => {
  const { selectedRating, numberOfAdults, numberOfChildren } = selectedFilters

  const renderCorrectComponent = () => {
    switch (type) {
      case 'rating': {
        return (
          <RatingComponent
            selectedRating={selectedRating}
            setSelectedFilters={setSelectedFilters}
          />
        )
      }
      case 'counter': {
        return (
          <CounterComponent
            label={label}
            numberOfAdults={numberOfAdults}
            numberOfChildren={numberOfChildren}
            setSelectedFilters={setSelectedFilters}
          />
        )
      }
    }
  }

  return renderCorrectComponent()
}

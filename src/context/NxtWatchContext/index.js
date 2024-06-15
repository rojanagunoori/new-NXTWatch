import React from 'react'

const NxtWatchContext = React.createContext({
  isDark: true,
  savedList: [],
  onChageDark: () => {},
  onAddSavedList: () => {},
  onRemoveSavedList: () => {},
})

export default NxtWatchContext

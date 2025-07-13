import React, {  useState } from 'react'
import UserContext from './UserContext'

function UserContextProvider({children}) {
    let [context , SetContext] = useState(null)

  return (
    <UserContext.Provider value={{context , SetContext}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
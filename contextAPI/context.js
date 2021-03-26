import {createContext} from 'react';

export default createContext({
  userData: {
    name: '',
    email: '',
    password: '',
    UID: ''
  },
  updateUserData: (userData) => {}
}
)


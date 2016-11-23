import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: ['login'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST

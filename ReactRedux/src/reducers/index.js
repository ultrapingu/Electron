import { combineReducers } from 'redux'
import metadata from './metadata-reducer'
import variables from './variables-reducer'
import resourceGenerators from './resource-generators-reducer'
 
export default combineReducers({
  metadata,
  variables,
  resourceGenerators
})

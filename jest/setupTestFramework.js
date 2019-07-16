import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// eslint-disable-next-line
afterAll(() => {
  // Manually trigger garbage collection after every test to compensate for
  // memory leaks when running on CI.
  // More info: https://github.com/facebook/jest/issues/7874
  if (global && global.gc) {
    global.gc()
  }
})

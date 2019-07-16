import get from 'lodash/fp/get'
import isFunction from 'lodash/isFunction'

export const getViewportDimensions = () => ({
  width: get(['innerWidth'], window),
  height: get(['innerHeight'], window),
})

export const setViewportCSSVariables = ({ width, height }) => {
  const canSet = isFunction(
    get(['documentElement', 'style', 'setProperty'], document),
  )
  if (canSet && width && height) {
    document.documentElement.style.setProperty('--vw', `${width / 100}px`)
    document.documentElement.style.setProperty('--vh', `${height / 100}px`)
  }
}

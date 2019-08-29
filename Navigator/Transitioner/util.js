import { UIManager } from 'react-native'

export const measureNode = nativeHandle => {
  return new Promise((resolve, reject) => {
    UIManager.measureInWindow(nativeHandle, (pageX, pageY, widthItem, heightItem) => {
      resolve({ pageX, pageY, widthItem, heightItem })
    })
  })
}

export const aaa = () => {}

export const ESP = 0.00001

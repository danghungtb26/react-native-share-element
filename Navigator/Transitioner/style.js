export const getStyle = (animation, fromIndex, fromItem, toItem) => {
  return {}
}

export const test = () => {}

export const getFontSize = element => {
  return (element.props && element.props.style.fontSize) || 12
}

export const getTypeElement = element => {
  return element.type
}

export const type = {
  text: 'Text',
  image: 'Image',
  view: 'View',
}

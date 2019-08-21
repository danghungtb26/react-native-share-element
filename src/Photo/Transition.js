import React from 'react'
import { Text, View, Image, ListView, Dimensions, TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'

const maxWidth = Dimensions.get('window').width

export default class Transition extends React.Component {
  state = {
    destinationDimension: {
      width: maxWidth,
      height: 300,
      pageX: 0,
      pageY: 0,
    },
    sourceDimension: {
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    },
    tran: {
      pageX: 0,
      pageY: 0,
      width: 0,
      height: 0,
      scale: 1,
    },
  }

  componentWillReceiveProps(nextProps) {
    const { photo, sourceImageRefs } = nextProps

    if (photo) {
      const sourceImageRef = sourceImageRefs[photo.id]
      console.log('TCL: Transition -> componentWillReceiveProps -> sourceImageRef', sourceImageRef)

      sourceImageRef.getNode().measure((soruceX, soruceY, width, height, pageX, pageY) => {
        this.setState({
          sourceDimension: {
            width,
            height,
            pageX,
            pageY,
          },
          photo,
          tran: {
            pageX: 0,
            pageY: 0,
            width: 0,
            height: 0,
            scale: 1,
          },
        })
      })
    }
  }

  onset = (x, y, scale) => {
    this.setState({ tran: { pageX: x, pageY: y, scale } })
  }

  render() {
    const { openProgress } = this.props
    const { destinationDimension, sourceDimension, photo } = this.state
    if (photo) {
      let destRightDimension = {
        width: 0,
        height: 0,
        pageX: 0,
        pageY: 0,
      }
      let openingInitScale = 1

      const aspectRatio = photo.width / photo.height
      const screenAspectRatio = destinationDimension.width / destinationDimension.height

      destRightDimension = {
        width: destinationDimension.width,
        height: destinationDimension.height,
        pageX: destinationDimension.pageX,
        pageY: destinationDimension.pageY,
      }

      if (aspectRatio - screenAspectRatio > 0) {
        destRightDimension.width = aspectRatio * destRightDimension.height
        destRightDimension.pageX -= (destRightDimension.width - destinationDimension.width) / 2
      } else {
        destRightDimension.height = destRightDimension.width / aspectRatio
        destRightDimension.pageY -= (destRightDimension.height - destinationDimension.height) / 2
      }

      const translateInitX = sourceDimension.pageX + sourceDimension.width / 2
      const translateInitY = sourceDimension.pageY + sourceDimension.height / 2
      const translateDestX = destRightDimension.pageX + destRightDimension.width / 2
      const translateDestY = destRightDimension.pageY + destRightDimension.height / 2

      openingInitTranslateX = translateInitX - translateDestX
      openingInitTranslateY = translateInitY - translateDestY

      openingInitScale = sourceDimension.width / destRightDimension.width

      return (
        <Animated.Image
          source={photo.source}
          style={{
            backgroundColor: 'green',
            position: 'absolute',
            width: destRightDimension.width,
            height: destRightDimension.height,
            left: destRightDimension.pageX,
            top: destRightDimension.pageY,
            opacity: openProgress.interpolate({
              inputRange: [0, 0.005, 0.995, 1],
              outputRange: [0, 1, 1, 0],
            }),
            transform: [
              {
                translateX: openProgress.interpolate({
                  inputRange: [Number.EPSILON, 1 - Number.EPSILON],
                  outputRange: [openingInitTranslateX, this.state.tran.pageX],
                }),
              },
              {
                translateY: openProgress.interpolate({
                  inputRange: [Number.EPSILON, 1 - Number.EPSILON],
                  outputRange: [openingInitTranslateY, this.state.tran.pageY],
                }),
              },
              {
                scale: openProgress.interpolate({
                  inputRange: [Number.EPSILON, 1 - Number.EPSILON],
                  outputRange: [openingInitScale, this.state.tran.scale],
                }),
              },
            ],
          }}
        />
      )
    }
    return <View />
  }
}

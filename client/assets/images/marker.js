import * as React from "react"
import { View } from 'react-native'
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <View style={{ aspectRatio: 1 }}>
      <Svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 25 25" {...props}>
        <Path
          d="M12 0a8 8 0 0 0-8 8c0 1.421.382 2.75 1.031 3.906.108.192.221.381.344.563L12 24l6.625-11.531c.102-.151.19-.311.281-.469l.063-.094A7.954 7.954 0 0 0 20 8a8 8 0 0 0-8-8zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
          fill="#E93046"
        />
        <Path
          d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
          fill="#AB2132"
        />
      </Svg>
    </View>
)

export default SvgComponent

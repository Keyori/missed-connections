import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Clock(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13 .406C6.043.406.406 6.043.406 13S6.043 25.594 13 25.594 25.594 19.957 25.594 13 19.957.406 13 .406zm0 22.75A10.153 10.153 0 012.844 13 10.153 10.153 0 0113 2.844 10.153 10.153 0 0123.156 13 10.153 10.153 0 0113 23.156zm3.138-5.301l-4.311-3.133a.613.613 0 01-.249-.493V5.89c0-.336.274-.61.61-.61h1.624c.336 0 .61.274.61.61v7.195l3.392 2.468c.274.198.33.58.132.853l-.955 1.316a.614.614 0 01-.853.132z"
        fill="#E93046"
      />
    </Svg>
  )
}

export default Clock

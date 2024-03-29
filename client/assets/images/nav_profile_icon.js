import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { ThemeContext } from "../../styles/ThemeContext"

const NavProfileIcon = (props) => {
  const theme = React.useContext(ThemeContext)
  //const color = props.color
  const color = props.color
  return (
    <Svg
      width={16}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 10.994a5.224 5.224 0 0 0 2.934-.904 5.346 5.346 0 0 0 1.945-2.407c.4-.98.505-2.058.3-3.098a5.39 5.39 0 0 0-1.444-2.746A5.257 5.257 0 0 0 9.03.372 5.207 5.207 0 0 0 5.98.677a5.3 5.3 0 0 0-2.37 1.975 5.421 5.421 0 0 0-.89 2.98c0 1.422.556 2.786 1.547 3.791A5.241 5.241 0 0 0 8 10.993Zm0-9.9a4.42 4.42 0 0 1 2.483.765 4.523 4.523 0 0 1 1.646 2.036c.338.829.426 1.741.254 2.622A4.56 4.56 0 0 1 11.16 8.84a4.448 4.448 0 0 1-2.288 1.242 4.406 4.406 0 0 1-2.582-.259 4.484 4.484 0 0 1-2.006-1.67 4.587 4.587 0 0 1-.753-2.522c0-1.203.471-2.357 1.31-3.208A4.435 4.435 0 0 1 8 1.093Zm7.873 17.7a8.634 8.634 0 0 0-3.143-3.873A8.44 8.44 0 0 0 8 13.469a8.44 8.44 0 0 0-4.73 1.454 8.634 8.634 0 0 0-3.143 3.872.418.418 0 0 0 .085.45 10.96 10.96 0 0 0 3.57 2.438 10.826 10.826 0 0 0 8.436 0 10.96 10.96 0 0 0 3.57-2.438.415.415 0 0 0 .085-.45ZM8 21.72A9.99 9.99 0 0 1 .984 18.86a7.804 7.804 0 0 1 2.848-3.33A7.634 7.634 0 0 1 8 14.29c1.478 0 2.924.43 4.168 1.24a7.804 7.804 0 0 1 2.848 3.33A9.99 9.99 0 0 1 8 21.72Z"
        fill={color}
      />
    </Svg>
  )
}

export default NavProfileIcon

import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function Index({ types, fill }) {

    if (includesMultiple(types, "library")) return <LibraryIcon fill = {fill}/>

    if (includesMultiple(types, ["food", "restaurant"])) return <FoodIcon fill = {fill}/>

    if (includesMultiple(types, "gym")) return <GymIcon fill = {fill}/>

    if (includesMultiple(types, "university")) return <DormIcon fill = {fill}/>

    return <GenericIcon fill = {fill}/>
}





function includesMultiple(arr, values) {
    if (typeof (values) === 'string') return arr.includes(values)
    for(let i = 0 ; i < values.length; i++){
        if(arr.includes(values[i])) return true; 
    }
    return false; 
}





function FoodIcon({fill ="#6B848D"}) {
    return (
        <Svg
            width={10}
            height={18}
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M7.475 12.422l-.016 4.363a.356.356 0 00.357.359h.015l1.765-.072a.357.357 0 00.342-.356l.017-4.447a1.05 1.05 0 01-.296.065l-2.184.088zM9.864.079a.35.35 0 00-.31-.065C7.9.44 6.667 1.943 6.481 3.757l-.764 7.614a.347.347 0 00.093.279.353.353 0 00.26.114h.015l3.532-.143c.19-.01.34-.164.343-.357L10 .361c0-.111-.05-.215-.136-.282zM2.143 7.403c-.379 0-.735-.097-1.06-.271l-.248 8.516c-.028.4.107.793.37 1.079.244.264.57.413.918.417h.017c.346 0 .672-.142.918-.401.271-.286.412-.682.386-1.073L3.23 7.118a2.23 2.23 0 01-1.087.285zM2.143 0C.943 0 0 1.471 0 3.346S.943 6.69 2.143 6.69c1.203 0 2.143-1.468 2.143-3.343S3.346 0 2.143 0z"
                fill={fill}
            />
        </Svg>
    )
}

function DormIcon({fill ="#6B848D"}) {
    return (
        <Svg
            width={15}
            height={12}
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <Path
                d="M14.791 5.683l-1.934-1.488V1.822a.536.536 0 00-.535-.536h-1.607a.536.536 0 00-.536.536v.313L7.827.325a.536.536 0 00-.653 0L.209 5.684c-.404.31-.183.96.326.96h1.608v4.822c0 .296.24.536.535.536h2.68V8.25c0-.296.239-.536.535-.536h3.214c.296 0 .536.24.536.535V12h2.679c.296 0 .536-.24.536-.535V6.643h1.606c.51 0 .731-.65.327-.96zM2.244 5.469L6.76 1.995c.176-.135.414.063.312.26l-2.25 3.317H2.278a.057.057 0 01-.035-.103z"
                fill={fill}
            />
        </Svg>
    )
}

function GymIcon({fill ="#6B848D"}) {
    return (
        <Svg
            width={18}
            height={10}
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <Path
                d="M6.322 3.875h5.36v2.25h-5.36v-2.25zM5.573 1.625v6.75a1.126 1.126 0 01-2.25 0V8.33a1.039 1.039 0 01-.376.068 1.128 1.128 0 01-1.125-1.125V6.125h-.697a1.126 1.126 0 010-2.25h.698V2.731a1.126 1.126 0 011.5-1.06v-.046a1.126 1.126 0 012.25 0zM18 5c0 .62-.503 1.126-1.125 1.126h-.694v1.147c0 .619-.502 1.125-1.125 1.125a1.04 1.04 0 01-.375-.067v.045a1.126 1.126 0 01-2.25 0v-6.75a1.126 1.126 0 012.25 0v.045a1.124 1.124 0 011.5 1.061v1.144h.694C17.497 3.876 18 4.378 18 5z"
                fill={fill}
            />
        </Svg>
    )
}

function LibraryIcon({fill ="#6B848D"}) {
    return (
        <Svg
            width={13}
            height={17}
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <Path
                d="M10.969 3.25H2.03A2.012 2.012 0 000 5.28C0 6.42.894 7.312 2.031 7.312c.163 0 .244 0 .407-.08v9.018h1.625V6.5h1.625v9.75h1.625V6.5h1.624v9.75h1.626V7.23c.162 0 .243.081.406.081A2.011 2.011 0 0013 5.282a2.012 2.012 0 00-2.031-2.032zM2.438 0h8.124v1.625H2.438V0z"
                fill={fill}
            />
        </Svg>
    )
}

function GenericIcon({fill ="#6B848D"}) {
    return (
        <Svg
            width={10}
            height={13}
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <Path
                d="M9.996 4.785A4.995 4.995 0 005.078.001a4.898 4.898 0 00-3.581 1.43A4.983 4.983 0 000 4.999v.147a4.955 4.955 0 001.497 3.381l3.514 3.501 3.595-3.554a5.04 5.04 0 001.39-3.689zm-4.998 2.46a2.213 2.213 0 01-2.218-2.22c0-1.229.989-2.218 2.218-2.218 1.23 0 2.218.99 2.218 2.219 0 1.23-.988 2.218-2.218 2.218z"
                fill={fill}
            />
        </Svg>
    )
}
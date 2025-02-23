import { ScaleDto } from '@/api/survey'
import { When } from 'react-if'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  LabelList,
  DotProps,
} from 'recharts'
import { entries, map, meanBy, pick } from 'lodash-es'
import { KARMA_ATTRIBUTES } from '@/lib/constants'

type Props = {
  scale: ScaleDto
}

//@ts-ignore
const CustomLabel = (props) => {
  const { x, y, value } = props

  if (value === 0) {
    return null
  }

  // Adjust these values to fit your chart's styling
  const width = 60 // Width of the bubble
  const height = 30 // Height of the bubble
  const tailWidth = 5 // Width of the tail at the base
  const tailHeight = 5 // Height of the tail

  // Calculate positions based on the text element's x and y
  const rectX = x - width / 2
  const rectY = y - height - tailHeight - 10 // Extra -10 for additional offset from the point
  const textX = x
  const textY = rectY + height / 2

  // Points for the tail polygon
  const tailPoints = `${x - tailWidth / 2},${rectY + height} ${x},${rectY + height + tailHeight} ${
    x + tailWidth / 2
  },${rectY + height}`

  return (
    <When condition={value > 0}>
      <g>
        <rect
          x={rectX}
          y={rectY}
          width={width}
          height={height}
          rx="15"
          fill="rgba(1, 1, 1, 0.83)"
        />
        <polygon points={tailPoints} fill="rgba(1, 1, 1, 0.83)" />
        <text
          x={textX}
          y={textY}
          dy={2}
          fill="#ffffff"
          // fontSize={15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs"
        >
          {value}
        </text>
      </g>
    </When>
  )
}

const CustomDot = (props: DotProps) => {
  //@ts-ignore
  const { cx, cy, values, payload } = props

  if (payload.isDip) {
    return null
  }

  if (cx && cy) {
    return (
      <When condition={cy > 0}>
        <circle cx={cx} cy={cy} r={5} fill="#FF9653" stroke="none" />
      </When>
    )
  }

  return null
}

const Chart = (props: Props) => {
  const strippedScale = pick(props.scale, KARMA_ATTRIBUTES)

  const dataPoints = map(entries(strippedScale), ([key, value]) => ({
    x: key,
    y: value,
    isDip: false,
  }))

  const midpoint = 0

  const modifiedData = [
    { x: null, y: midpoint, isDip: true },
    ...map(dataPoints, (point, index) => [
      point,
      ...(index < dataPoints.length - 1 ? [{ x: null, y: midpoint, isDip: true }] : []),
    ]).flat(),
    { x: null, y: midpoint, isDip: true },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={modifiedData} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(255, 150, 83, 0.3)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgba(255, 150, 83, 0.3)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="x"
          domain={['dataMin', 'dataMax']}
          className="uppercase"
          tick={{ fill: 'white', fontSize: 12 }}
        />
        <YAxis fill="white" domain={[0, 40]} tick={{ fill: 'white' }} />
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(246, 246, 246, 0.3)" />
        <Area
          type="monotone"
          dataKey="y"
          stroke="#FF9653"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorY)"
          dot={<CustomDot />}
        >
          <LabelList dataKey="y" content={<CustomLabel />} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Chart

import {
  Stat as ChakraStat,
  StatLabel as ChakraStatLabel,
  StatNumber as ChakraStatNumber,
  StatHelpText as ChakraStatHelpText,
  StatArrow as ChakraStatArrow,
  StatGroup as ChakraStatGroup,
} from '@chakra-ui/react'
import {
  StatProps as ChakraStatProps,
  StatLabelProps as ChakraStatLabelProps,
  StatNumberProps as ChakraStatNumberProps,
  StatHelpTextProps as ChakraStatHelpTextProps,
  StatArrowProps as ChakraStatArrowProps,
  StatGroupProps as ChakraStatGroupProps,
} from '@chakra-ui/stat'

type StatProps = ChakraStatProps

type StatLabelProps = ChakraStatLabelProps

type StatNumberProps = ChakraStatNumberProps

type StatHelpTextProps = ChakraStatHelpTextProps

type StatArrowProps = ChakraStatArrowProps

type StatGroupProps = ChakraStatGroupProps

export function Stat(props: StatProps) {
  return <ChakraStat {...props} />
}

export function StatLabel(props: StatLabelProps) {
  return <ChakraStatLabel {...props} />
}

export function StatNumber(props: StatNumberProps) {
  return <ChakraStatNumber {...props} />
}

export function StatHelpText(props: StatHelpTextProps) {
  return <ChakraStatHelpText {...props} />
}

export function StatArrow(props: StatArrowProps) {
  return <ChakraStatArrow {...props} />
}

export function StatGroup(props: StatGroupProps) {
  return <ChakraStatGroup {...props} />
}

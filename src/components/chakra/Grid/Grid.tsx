import { Grid as ChakraGrid, GridItem as ChakraGridItem } from '@chakra-ui/react'
import {
  GridProps as ChakraGridProps,
  GridItemProps as ChakraGridItemProps,
} from '@chakra-ui/react'

type GridProps = ChakraGridProps

type GridItemProps = ChakraGridItemProps

export function Grid(props: GridProps) {
  return <ChakraGrid {...props} />
}

export function GridItem(props: GridItemProps) {
  return <ChakraGridItem {...props} />
}

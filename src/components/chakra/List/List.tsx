import {
  List as ChakraList,
  ListItem as ChakraListItem,
  ListIcon as ChakraListIcon,
  OrderedList as ChakraOrderedList,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react'
import { IconProps as ChakraIconProps } from '@chakra-ui/icon'
import {
  ListProps as ChakraListProps,
  ListItemProps as ChakraListItemProps,
} from '@chakra-ui/layout'

type ListProps = ChakraListProps

type ListItemProps = ChakraListItemProps

type ListIconProps = ChakraIconProps

export function List(props: ListProps) {
  return <ChakraList {...props} />
}

export function ListItem(props: ListItemProps) {
  return <ChakraListItem {...props} />
}

export function ListIcon(props: ListIconProps) {
  return <ChakraListIcon {...props} />
}

export function OrderedList(props: ListProps) {
  return <ChakraOrderedList {...props} />
}

export function UnorderedList(props: ListProps) {
  return <ChakraUnorderedList {...props} />
}

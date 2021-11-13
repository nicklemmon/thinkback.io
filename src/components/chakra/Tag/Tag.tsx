import {
  Tag as ChakraTag,
  TagLabel as ChakraTagLabel,
  TagLeftIcon as ChakraTagLeftIcon,
  TagRightIcon as ChakraTagRightIcon,
  TagCloseButton as ChakraTagCloseButton,
} from '@chakra-ui/react'
import {
  TagProps as ChakraTagProps,
  TagLabelProps as ChakraTagLabelProps,
  TagCloseButtonProps as ChakraTagCloseButtonProps,
} from '@chakra-ui/tag'
import { IconProps as ChakraIconProps } from '@chakra-ui/icons'

type TagProps = ChakraTagProps

type TagLabelProps = ChakraTagLabelProps

type TagIconProps = ChakraIconProps

type TagCloseButtonProps = ChakraTagCloseButtonProps

export function Tag(props: TagProps) {
  return <ChakraTag {...props} />
}

export function TagLabel(props: TagLabelProps) {
  return <ChakraTagLabel {...props} />
}

export function TagLeftIcon(props: TagIconProps) {
  return <ChakraTagLeftIcon {...props} />
}

export function TagRightIcon(props: TagIconProps) {
  return <ChakraTagRightIcon {...props} />
}

export function TagCloseButton(props: TagCloseButtonProps) {
  return <ChakraTagCloseButton {...props} />
}

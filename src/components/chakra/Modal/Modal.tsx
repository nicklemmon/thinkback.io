import {
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
} from '@chakra-ui/react'
import type {
  ModalProps as ChakraModalProps,
  ModalOverlayProps as ChakraModalOverlayProps,
  ModalContentProps as ChakraModalContentProps,
  ModalHeaderProps as ChakraModalHeaderProps,
  ModalFooterProps as ChakraModalFooterProps,
  ModalBodyProps as ChakraModalBodyProps,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'

type ModalProps = ChakraModalProps

type ModalOverlayProps = ChakraModalOverlayProps

type ModalContentProps = ChakraModalContentProps

type ModalHeaderProps = ChakraModalHeaderProps

type ModalFooterProps = ChakraModalFooterProps

type ModalBodyProps = ChakraModalBodyProps

type ButtonProps = ChakraButtonProps

export function Modal({ children, ...props }: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />

      <ModalContent>{children}</ModalContent>
    </ChakraModal>
  )
}

export function ModalOverlay(props: ModalOverlayProps) {
  return <ChakraModalOverlay {...props} />
}

export function ModalContent(props: ModalContentProps) {
  return <ChakraModalContent {...props} />
}

export function ModalHeader(props: ModalHeaderProps) {
  return <ChakraModalHeader {...props} />
}

export function ModalFooter(props: ModalFooterProps) {
  return <ChakraModalFooter {...props} />
}

export function ModalBody(props: ModalBodyProps) {
  return <ChakraModalBody {...props} />
}

export function ModalCloseButton(props: ButtonProps) {
  return <ChakraModalCloseButton {...props} />
}

import { HStack } from 'src/components/chakra'

type ButtonWrapperProps = {
  children: React.ReactNode
}

export function ButtonWrapper({ children }: ButtonWrapperProps) {
  return <HStack>{children}</HStack>
}

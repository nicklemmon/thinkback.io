import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tfoot as ChakraTfoot,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableCaption as ChakraTableCaption,
} from '@chakra-ui/react'
import type {
  TableProps as ChakraTableProps,
  TableHeadProps as ChakraTableHeadProps,
  TableBodyProps as ChakraTableBodyProps,
  TableFooterProps as ChakraTableFooterProps,
  TableRowProps as ChakraTableRowProps,
  TableColumnHeaderProps as ChakraTableColumnHeaderProps,
  TableCellProps as ChakraTableCellProps,
  TableCaptionProps as ChakraTableCaptionProps,
} from '@chakra-ui/table'

type TableProps = ChakraTableProps

type TheadProps = ChakraTableHeadProps

type TbodyProps = ChakraTableBodyProps

type TfootProps = ChakraTableFooterProps

type TrProps = ChakraTableRowProps

type ThProps = ChakraTableColumnHeaderProps

type TdProps = ChakraTableCellProps

type TableCaptionProps = ChakraTableCaptionProps

export function Table(props: TableProps) {
  return <ChakraTable {...props} />
}

export function Thead(props: TheadProps) {
  return <ChakraThead {...props} />
}

export function Tbody(props: TbodyProps) {
  return <ChakraTbody {...props} />
}

export function Tfoot(props: TfootProps) {
  return <ChakraTfoot {...props} />
}

export function Tr(props: TrProps) {
  return <ChakraTr {...props} />
}

export function Th(props: ThProps) {
  return <ChakraTh {...props} />
}

export function Td(props: TdProps) {
  return <ChakraTd {...props} />
}

export function TableCaption(props: TableCaptionProps) {
  return <ChakraTableCaption {...props} />
}

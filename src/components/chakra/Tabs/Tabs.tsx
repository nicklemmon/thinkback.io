import {
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  TabPanels as ChakraTabPanels,
  Tab as ChakraTab,
  TabPanel as ChakraTabPanel,
} from '@chakra-ui/react'
import {
  TabsProps as ChakraTabsProps,
  TabListProps as ChakraTabListProps,
  TabPanelsProps as ChakraTabPanelsProps,
  TabProps as ChakraTabProps,
  TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/tabs'

type TabsProps = ChakraTabsProps

type TabListProps = ChakraTabListProps

type TabPanelsProps = ChakraTabPanelsProps

type TabProps = ChakraTabProps

type TabPanelProps = ChakraTabPanelProps

export function Tabs(props: TabsProps) {
  return <ChakraTabs {...props} />
}

export function TabList(props: TabListProps) {
  return <ChakraTabList {...props} />
}

export function TabPanels(props: TabPanelsProps) {
  return <ChakraTabPanels {...props} />
}

export function Tab(props: TabProps) {
  return <ChakraTab {...props} />
}

export function TabPanel(props: TabPanelProps) {
  return <ChakraTabPanel {...props} />
}

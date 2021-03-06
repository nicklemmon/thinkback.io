import { useSelect, useMultipleSelection } from 'downshift'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, FormLabel, HStack, Tag, TagLabel, TagCloseButton } from 'src/components/chakra'

type MultiSelectOptions = any[] | []

export function MultiSelect({
  options,
  label,
  name,
  placeholder,
  defaultValue = [],
  isDisabled = false,
  itemToString = arg => arg,
}: {
  options: MultiSelectOptions
  label: string
  id: string
  isDisabled?: boolean
  name?: string
  placeholder?: string
  defaultValue?: MultiSelectOptions
  itemToString?: (arg: any) => string
}) {
  const { getSelectedItemProps, addSelectedItem, removeSelectedItem, selectedItems } =
    useMultipleSelection({ initialSelectedItems: defaultValue.map(itemToString) })
  const hasSelectedItems = Boolean(selectedItems.length)

  const formattedOptions: string[] | [] = options.map(itemToString)

  const getFilteredItems = (options: MultiSelectOptions) => {
    return options.filter(option => selectedItems.indexOf(option) < 0)
  }

  const { isOpen, getLabelProps, getMenuProps, getItemProps, openMenu } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items: getFilteredItems(formattedOptions),
    stateReducer: (_state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (selectedItem) {
            addSelectedItem(selectedItem)
          }
          break
        default:
          break
      }
    },
  })

  return (
    <Box
      pointerEvents={isDisabled ? 'none' : 'unset'}
      cursor={isDisabled ? 'not-allowed' : 'unset'}
    >
      <FormLabel {...getLabelProps()}>{label}</FormLabel>

      {/* This is styled like the `Input` component */}
      {/* TODO: Handle focus styles */}
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="md"
        paddingY={2}
        paddingLeft={4}
        paddingRight={2}
        position="relative"
        tabIndex={0}
        onFocus={openMenu}
      >
        {!hasSelectedItems ? (
          <Box as="span" aria-hidden="true" color="gray.700">
            {placeholder ? placeholder : 'Make a selection'}
          </Box>
        ) : null}

        <Box>
          <HStack>
            {selectedItems.map((selectedItem, index) => (
              <Tag
                key={`selected-item-${index}`}
                {...getSelectedItemProps({ selectedItem, index })}
              >
                <TagLabel>{selectedItem}</TagLabel>

                <TagCloseButton
                  onClick={() => removeSelectedItem(selectedItem)}
                  isDisabled={isDisabled}
                  aria-label="Remove Selected Item"
                >
                  &#10005;
                </TagCloseButton>
              </Tag>
            ))}
          </HStack>
        </Box>

        <Box position="absolute" right="0" top="0" paddingY={2} paddingX={3}>
          {isOpen ? <ChevronUpIcon w={5} h={5} /> : <ChevronDownIcon w={5} h={5} />}
        </Box>

        {isOpen && getFilteredItems(formattedOptions).length ? (
          <Box
            position="absolute"
            top="100%"
            left="0"
            width="100%"
            zIndex="dropdown"
            borderWidth="1px"
          >
            <ul style={{ listStyleType: 'none' }} {...getMenuProps()}>
              {getFilteredItems(formattedOptions).map((item, index) => (
                <Box
                  key={`${item}-${index}`}
                  as="li"
                  paddingY={2}
                  paddingX={4}
                  cursor="pointer"
                  backgroundColor="white"
                  backgroundColorHover="gray.100"
                  {...getItemProps({ item, index })}
                >
                  {item}
                </Box>
              ))}
            </ul>
          </Box>
        ) : null}
      </Box>

      {/* For handling form data */}
      <input type="hidden" value={selectedItems} name={name} />
    </Box>
  )
}

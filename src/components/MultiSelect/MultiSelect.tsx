import { useSelect, useMultipleSelection } from 'downshift'

type MultiSelectOption = string

export function MultiSelect({
  options,
  label,
  name,
  placeholder,
  defaultValue = [],
  disabled = false,
}: {
  options: MultiSelectOption[]
  label: string
  id: string
  disabled: boolean
  name?: string
  placeholder?: string
  defaultValue?: MultiSelectOption[]
}) {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: defaultValue })
  const getFilteredItems = (options: MultiSelectOption[]) =>
    options.filter(option => selectedItems.indexOf(option) < 0)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items: getFilteredItems(options),
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
    <div>
      <label {...getLabelProps()}>{label}</label>

      <div>
        {selectedItems.map((selectedItem, index) => (
          <span key={`selected-item-${index}`} {...getSelectedItemProps({ selectedItem, index })}>
            {selectedItem}

            <button
              onClick={() => removeSelectedItem(selectedItem)}
              type="button"
              disabled={disabled}
              aria-label="Remove Selected Item"
            >
              &#10005;
            </button>
          </span>
        ))}

        <button
          type="button"
          disabled={disabled}
          {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))}
        >
          {placeholder ? placeholder : 'Make a selection'}
        </button>

        <ul {...getMenuProps()}>
          {isOpen &&
            getFilteredItems(options).map((item, index) => (
              <li
                key={`${item}-${index}`}
                style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

      {/* For handling form data */}
      <input type="hidden" value={selectedItems} name={name} />
    </div>
  )
}

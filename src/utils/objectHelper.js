export const objectHelper = (items, objPropName, itemId, objPropNameChange, newValue) => {
    items.map(item => {
        if (item[objPropName] === itemId) {
            item[objPropNameChange] = newValue
        }
    })
}
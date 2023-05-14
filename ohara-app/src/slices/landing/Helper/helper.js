export let updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
  return items.map((value) => {
    if (value[objPropName] === itemId) {
      return { ...value, ...newObjProps };
    }
    return value;
  });
};

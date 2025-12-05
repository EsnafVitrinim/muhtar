export const statusSelections = [
  { id: '1', label: 'Alındı' },
  { id: '0', label: 'Alınmadı' }
];

export const getSelections = (data, config) => {
  let selections = [];
  data.map(item => {
    const newObj = {};
    newObj.id = item[config.value],
    newObj.label = item[config.label];

    selections.push(newObj);
  });
  return selections;
}

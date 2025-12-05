import moment from "moment";

export const getStatusColor = (value) => {
  switch (value) {
    case '1': return 'success';
    case '0': return 'error';
    default:
      return 'info';
  }
}

export const getStatusText = (field, obj) => {
  let statusText = '';
  if (field.dynamicText) {
    statusText = field.suffix ? field.dynamicText[obj[field.key]] + ` ${field.suffix}` : field.dynamicText[obj[field.key]];
  } else {
    statusText = field.suffix ? obj[field.field.key] + ` ${field.suffix}` : obj[field.field.key]
  }
  return statusText;
}

export const transformObject = (obj, transformKeys) => {
  const fieldsToTransform = transformKeys;

  const newObj = { ...obj };

  fieldsToTransform.forEach(field => {
    if (obj[field.key]) {
      if (field.transformType === 'STATUS') {
        const statusType = field.type || getStatusColor(obj[field.key]);
        const statusText = getStatusText(field, obj);
        newObj[field.key] = {
          type: statusType,
          value: statusText || ''
        };
      }
      if (field.transformType === 'LINK') {
        newObj[field.key] = {
          path: `${field.path}${obj[field.key]}`,
          text: field.text
        };
      }
      if (field.transformType === 'DATE') {
        const formattedDate = moment(obj[field.key]).format("DD.MM.YYYY");
        newObj[field.key] = formattedDate;
      }
      if (field.transformType === 'ACTION') {
        newObj[field.key] = {
          actions: field.actions,
          value: obj[field.urlPathKey]
        };
      }
    } else {
      // TODO: 
    }
  });

  return newObj;
}

export const transformArray = (arr, transformKeys) => {
  return arr.map(obj => transformObject(obj, transformKeys));
}
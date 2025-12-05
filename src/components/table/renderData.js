import { isValidElement } from "react";
import Progress from "../progress";
import Status from "../status";
import CopySnippet from "../snippet";
import Chip from "../chip";
import TableActions from "./TableActions";
import TableSparkChart from "./TableSparkChart";

export const renderData = (item, columnKey, columnType) => {
  const cellValue = item[columnKey];

  if (isValidElement(cellValue)) {
    return cellValue;
  }

  switch (columnType) {
    case 'chip': return <Chip item={cellValue} />;
    case 'action': return <TableActions item={item} cellValue={cellValue} />;
    // case 'status': return <Status item={cellValue} />;
    // case 'progress': return <Progress item={cellValue} />;
    // case 'snippet': return <CopySnippet item={cellValue} />;
    // case 'sparkChart': return <TableSparkChart cellValue={cellValue} />;
    default:
      return (
        <p className="w-max text-sm text-black dark:text-dark-50">
          {cellValue}
        </p>
      )
  }
}
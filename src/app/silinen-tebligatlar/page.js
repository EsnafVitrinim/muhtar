'use client'

import { NotificationIcon, PlusIcon } from "@/icons";
import Card from "@/components/card";
import TableUI from "@/components/table";
import { getDeletedNotificationsTableData } from "@/utils/table";
import Link from "next/link";
import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";

export default function DeletedNotifications() {
  const isLoading = useSelector(SELECTORS.getNotificationsLoading);
  const notifications = useSelector(SELECTORS.getDeletedNotifications);
  if (isLoading) return <Loading />

  const tableData = getDeletedNotificationsTableData(notifications);
  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <NotificationIcon />,
            title: 'Silinen Tebligatlar',
            description: 'Sildiğiniz tüm tebligatları görebilirsiniz'
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={50}
        />
      </Card>
    </div>
  );
}

'use client'
import { NotificationIcon, PlusIcon } from "@/icons";
import Card from "@/components/card";
import TableUI from "@/components/table";
import { getNotificationsTableData } from "@/utils/table";
import Link from "next/link";
import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";

export default function Home() {
  const isLoading = useSelector(SELECTORS.getNotificationsLoading);
  const notifications = useSelector(SELECTORS.getNotifications);

  if (isLoading) return <Loading />;

  const tableData = getNotificationsTableData(notifications);
  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <NotificationIcon />,
            title: 'Tebligatlar',
            description: 'Oluşturduğunuz tüm tebligatları görebilirsiniz'
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={50}
          actionButtonProps={{
            text: 'Yeni Ekle',
            as: Link,
            href: 'tebligat-ekle',
            startContent: <PlusIcon width={14} />
          }}
          emptyContentActions={{
            startContent: <PlusIcon width={18} />,
            as: Link,
            href: 'tebligat-ekle',
            text: 'Yeni Tebligat Ekle'
          }}
        />
      </Card>
    </div>
  );
}

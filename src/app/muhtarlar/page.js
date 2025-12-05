'use client'

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getAllUsersTableData } from "@/utils/table";
import { UserIcon } from "@/icons";

function Muhtarlar() {
  const isLoading = useSelector(SELECTORS.getUserLoading);
  const users = useSelector(SELECTORS.getAllUsers);
  const adminUsers = users.filter(user => Number(user.isAdmin) !== 1);

  if (isLoading) return <Loading />

  const tableData = getAllUsersTableData(adminUsers);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <UserIcon />,
            title: 'Muhtarlar',
            description: 'Kayıt olan tüm muhtarları görebilirsiniz'
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={50}
        />
      </Card>
    </div>
  )
}

export default Muhtarlar;

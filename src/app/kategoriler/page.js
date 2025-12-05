'use client'
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getCategoriesTableData } from "@/utils/table";
import { GemIcon, PlusIcon } from "@/icons";
import { setCreateCategoryModal } from "@/store/reducers/ui/uiReducer";
import CreateCategory from "@/components/Modals/CreateCategory";
import UpdateCategory from "@/components/Modals/UpdateCategory";

function Categories() {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getCategoriesLoading);
  const categories = useSelector(SELECTORS.getCategories);

  if (isLoading) return <Loading />

  const tableData = getCategoriesTableData(categories);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <GemIcon />,
            title: 'Kategoriler',
            description: 'Oluşturduğunuz tüm kategorileri görebilirsiniz'
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={10}
          actionButtonProps={{
            text: 'Yeni Ekle',
            onClick: () => dispatch(setCreateCategoryModal(true)),
            startContent: <PlusIcon width={14} />
          }}
          emptyContentActions={{
            startContent: <PlusIcon width={18} />,
            onClick: () => dispatch(setCreateCategoryModal(true)),
            text: 'Yeni Kategori Ekle'
          }}
        />
      </Card>
      <CreateCategory />
      <UpdateCategory />
    </div>
  )
}

export default Categories;

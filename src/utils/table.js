import { transformArray } from "./tablesHelpers";
import * as ACTION_CREATORS from "@/store/actionCreators";
import { setUpdateCategoryModal } from "@/store/reducers/ui/uiReducer";

export const getNotificationsTableData = (data) => {
  const transformKeys = [
    {
      key: 'date',
      transformType: 'DATE',
    },
    {
      key: 'status',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Alındı',
        '0': 'Alınmadı'
      }
    },
    {
      key: 'deliveryDate',
      transformType: 'DATE',
    },
    {
      key: 'keyValue',
      actions: [
        {
          type: 'VIEW',
          path: '/tebligat/',
          text: 'Detay'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Tebligat Sil',
            description: 'Seçilen tebligat silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateNotificationAction
          }
        }
      ],
      urlPathKey: 'keyValue',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Sıra", uid: "id", type: 'text', sortable: true },
      { name: "ID", uid: "uniqueID", type: 'text', sortable: true },
      { name: "Ad Soyad", uid: "name", type: 'text', sortable: true },
      { name: "Tarih", uid: "date", type: 'text', sortable: true },
      { name: "Konusu", uid: "category", type: 'text', sortable: true },
      { name: "Durum", uid: "status", type: 'chip', sortable: true },
      { name: "TC", uid: "tcNo", type: 'text', sortable: true },
      { name: "Cep Tel", uid: "phone", type: 'text', sortable: true },
      { name: "Teslim Tarihi", uid: "deliveryDate", type: 'text', sortable: true },
      { name: "Teslim Alan", uid: "deliveryName", type: 'text', sortable: true },
      { name: "Teslim Alan Yakını", uid: "deliveryRelative", type: 'text', sortable: true },
      { name: "Teslim Alan Tel", uid: "deliveryPhone", type: 'text', sortable: true },
      { name: "Yakını", uid: "relativeName", type: 'text', sortable: true },
      { name: "Yakını Tel", uid: "relativePhone", type: 'text', sortable: true },
      { name: "Yakınlık Derecesi", uid: "relativeDegree", type: 'text', sortable: true },
      { name: "Not", uid: "not", type: 'text' },
      { name: "Detay", uid: "keyValue", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'name',
      placeholder: 'Adına göre ara..'
    },
    inititalVisibleColumns: ["name", "date", 'category', 'status', 'deliveryDate', 'deliveryName', 'deliveryRelative', 'deliveryPhone', 'keyValue'],
    defaultSortValue: {
      key: 'status',
      direction: 'descending'
    }
  };

  return tableData;
}

export const getDeletedNotificationsTableData = (data) => {
  const transformKeys = [
    {
      key: 'date',
      transformType: 'DATE',
    },
    {
      key: 'status',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Alındı',
        '0': 'Alınmadı'
      }
    },
    {
      key: 'deliveryDate',
      transformType: 'DATE',
    },
    {
      key: 'keyValue',
      actions: [
        {
          type: 'VIEW',
          path: '/tebligat/',
          text: 'Detay'
        }
      ],
      urlPathKey: 'keyValue',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "ID", uid: "id", type: 'text', sortable: true },
      { name: "Ad Soyad", uid: "name", type: 'text', sortable: true },
      { name: "Tarih", uid: "date", type: 'text', sortable: true },
      { name: "Konusu", uid: "category", type: 'text', sortable: true },
      { name: "Durum", uid: "status", type: 'chip', sortable: true },
      { name: "TC", uid: "tcNo", type: 'text', sortable: true },
      { name: "Cep Tel", uid: "phone", type: 'text', sortable: true },
      { name: "Teslim Tarihi", uid: "deliveryDate", type: 'text', sortable: true },
      { name: "Teslim Alan", uid: "deliveryName", type: 'text', sortable: true },
      { name: "Teslim Alan Yakını", uid: "deliveryRelative", type: 'text', sortable: true },
      { name: "Teslim Alan Tel", uid: "deliveryPhone", type: 'text', sortable: true },
      { name: "Yakını", uid: "relativeName", type: 'text', sortable: true },
      { name: "Yakını Tel", uid: "relativePhone", type: 'text', sortable: true },
      { name: "Yakınlık Derecesi", uid: "relativeDegree", type: 'text', sortable: true },
      { name: "Not", uid: "not", type: 'text' },
      { name: "Detay", uid: "keyValue", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'name',
      placeholder: 'Adına göre ara..'
    },
    inititalVisibleColumns: ["name", "date", 'category', 'status', 'deliveryDate', 'deliveryName', 'deliveryRelative', 'deliveryPhone', 'keyValue'],
    defaultSortValue: {
      key: 'status',
      direction: 'descending'
    }
  };

  return tableData;
}

export const getCategoriesTableData = (data) => {
  const transformKeys = [
    {
      key: 'created_at',
      transformType: 'DATE',
    },
    {
      key: 'keyValue',
      actions: [
        {
          type: 'UPDATE_MODAL',
          modal: setUpdateCategoryModal,
          dataName: 'category',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Kategori Sil',
            description: 'Seçilen kategori silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateCategoryAction
          }
        }
      ],
      urlPathKey: 'keyValue',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "ID", uid: "id", type: 'text', sortable: true },
      { name: "Tarih", uid: "created_at", type: 'text', sortable: true },
      { name: "Ad Soyad", uid: "name", type: 'text', sortable: true },
      { name: "Detay", uid: "keyValue", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'name',
      placeholder: 'Kategori ara..'
    },
    inititalVisibleColumns: ["id", "name", 'keyValue']
  };

  return tableData;
}


export const getAllUsersTableData = (data) => {
  const transformKeys = [
    {
      key: 'date',
      transformType: 'DATE',
    },
    {
      key: 'status',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Onaylı',
        '0': 'Onaysız'
      }
    },
    {
      key: 'keyValue',
      actions: [
        {
          type: 'VIEW',
          path: '/muhtar/',
          text: 'Detay'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Muhtar Sil',
            description: 'Seçilen muhtar silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateUserAction
          }
        }
      ],
      urlPathKey: 'keyValue',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Kod", uid: "uniqueCode", type: 'text', sortable: true },
      { name: "Tarih", uid: "created_at", type: 'text', sortable: true },
      { name: "Ad Soyad", uid: "name", type: 'text', sortable: true },
      { name: "İl", uid: "il", type: 'text', sortable: true },
      { name: "İlçe", uid: "ilce", type: 'text', sortable: true },
      { name: "Mahalle", uid: "mahalle", type: 'text', sortable: true },
      { name: "Email", uid: "email", type: 'text', sortable: true },
      { name: "Tel", uid: "phone", type: 'text', sortable: true },
      { name: "Onay", uid: "status", type: 'chip', sortable: true },
      { name: "Detay", uid: "keyValue", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'name',
      placeholder: 'Muhtar ara..'
    },
    inititalVisibleColumns: ["uniqueCode", "created_at", "name", "il", "phone", "status", 'keyValue'],
    defaultSortValue: {
      key: 'status',
      direction: 'descending'
    }
  };

  return tableData;
}

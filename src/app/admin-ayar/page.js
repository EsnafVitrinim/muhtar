"use client"

import SELECTORS from '@/store/selectors'
import { navigateTo } from '@/utils/helpers'
import { useSelector } from 'react-redux'

function AdminSettings() {
  const user = useSelector(SELECTORS.getUser);
  const isAdmin = useSelector(SELECTORS.getIsAdmin);
  if (!isAdmin) return null;

  const userKeyValue = user.keyValue;
  return (
    navigateTo(`/muhtar/${userKeyValue}`)
  )
}

export default AdminSettings

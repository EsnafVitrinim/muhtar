"use client"

import Account from '@/app/profil/page'
import { navigateTo } from '@/utils/helpers'
import React from 'react'

function EditForm({ editUserByAdmin }) {
  if (!editUserByAdmin) {
    navigateTo('/kategoriler');
    return;
  };

  return (
    <Account editUserByAdmin={editUserByAdmin} />
  )
}

export default EditForm

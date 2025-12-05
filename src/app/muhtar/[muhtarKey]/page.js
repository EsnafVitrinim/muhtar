'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notFound } from 'next/navigation';
import SELECTORS from '@/store/selectors';
import Loading from '@/components/loading';
import EditForm from './EditForm';
import Chip from '@/components/chip';

function MuhtarDetail({ params }) {
  const [muhtarKey, setMuhtarKey] = useState(null);
  const [paramLoading, setParamLoading] = useState(true);

  const users = useSelector(SELECTORS.getAllUsers);
  const isLoading = useSelector(SELECTORS.getUserLoading);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setMuhtarKey(resolvedParams.muhtarKey);
      setParamLoading(false);
    };
    resolveParams();
  }, [params]);

  if (paramLoading || isLoading) return <Loading />;

  const user = users.find(
    user => String(user.keyValue) === String(muhtarKey)
  );

  if (!user) return notFound();

  return (
    <>
      {Number(user.isAdmin) === 1 && (
        <Chip className='mt-4 font-semibold' item={{ type: 'warning', value: 'ADMİN AYARLARIDIR DİKKATLİ OLUNUZ!' }} />
      )}
      <EditForm editUserByAdmin={user} />
    </>
  );
};

export default MuhtarDetail;

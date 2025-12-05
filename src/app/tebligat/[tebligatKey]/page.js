'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notFound } from 'next/navigation';
import SELECTORS from '@/store/selectors';
import Loading from '@/components/loading';
import EditForm from './editForm';

function TebligatDetail({ params }) {
  const [tebligatKey, setTebligatKey] = useState(null);
  const [paramLoading, setParamLoading] = useState(true);

  const notifications = useSelector(SELECTORS.getAllNotifications);
  const isLoading = useSelector(SELECTORS.getNotificationsLoading);
  const isLoadingCategories = useSelector(SELECTORS.getCategoriesLoading);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setTebligatKey(resolvedParams.tebligatKey);
      setParamLoading(false);
    };
    resolveParams();
  }, [params]);

  if (paramLoading || isLoading || isLoadingCategories ) return <Loading />;

  const notification = notifications.find(
    notification => String(notification.keyValue) === String(tebligatKey)
  );

  if (!notification) return notFound();

  return (
    <EditForm notification={notification} />
  );
};

export default TebligatDetail;

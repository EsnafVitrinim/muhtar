'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { generateUniqueID, generateUniqueIdByDate, navigateTo, splitName } from '@/utils/helpers';
import { getSelections, statusSelections } from '@/utils/form';
import { createNotificationAction } from '@/store/actionCreators';
import SELECTORS from '@/store/selectors';
import Card from '@/components/card';
import InputField from '@/components/form/InputField';
import SubmitButton from '@/components/form/SubmitButton';
import TitleWithIcon from '@/components/title';
import SelectBox from '@/components/select';
import TextAreaField from '@/components/form/TextAreaField';

function TebligatEkle() {
  const dispatch = useDispatch();
  const user = useSelector(SELECTORS.getUser);
  const categories = useSelector(SELECTORS.getCategories);
  const notifications = useSelector(SELECTORS.getNotifications);
  const isLoading = useSelector(SELECTORS.getNotificationsLoading);
  const [categoriesSelections, setCategoriesSelections] = useState([]);
  const { id: userID } = user;
  const currentDate = moment().format('YYYY-MM-DD');
  const initialStates = {
    date: currentDate,
    tcNo: '',
    name: '',
    phone: '',
    category: '',
    status: '0',
    deliveryDate: '',
    deliveryName: '',
    deliveryPhone: '',
    deliveryRelative: '',
    mahalle: '',
    note: '',
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["name", "tcNo", "date", "phone", "category"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  useEffect(() => {
    if (categories.length > 0) {
      const selections = getSelections(categories, { value: 'name', label: 'name' });
      setCategoriesSelections(selections);
    }
  }, [categories])

  useEffect(() => {
    if (formData.status === '1') {
      setFormData({
        ...formData,
        deliveryDate: currentDate
      });
    } else {
      setFormData({
        ...formData,
        deliveryDate: ''
      });
    }
  }, [formData.status])

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueID = generateUniqueID();
    const uniqueIDByDate = generateUniqueIdByDate(notifications, user.id);
    const data = {
      ...formData,
      keyValue: uniqueID,
      uniqueID: uniqueIDByDate,
      user: userID,
      created_at: currentDate,
      updated_at: currentDate,
    }

    dispatch(createNotificationAction(data));
    navigateTo(`tebligat/${uniqueID}`);
    setFormData(initialStates);
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-start my-4'>
      <div className='flex flex-wrap gap-4 items-start w-full'>
        <Card extraClass='flex-1 w-full flex gap-4 flex-col max-w-[500px] min-w-[300px]'>
          <TitleWithIcon
            title='Kimlik Bilgileri'
          />
          <div className='flex flex-col gap-2'>
            <InputField
              isRequired
              type="date"
              label="Tarih"
              placeholder='doldurunuz..'
              value={formData.date}
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('date')}
            />
            <SelectBox
              isRequired
              label="Konusu"
              items={categoriesSelections}
              placeholder="Seçiniz"
              onChange={handleChange('category')}
            />
            <InputField
              isRequired
              type="text"
              label="TC No"
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('tcNo')}
            />
            <InputField
              isRequired
              type="text"
              label="Ad Soyad"
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('name')}
            />
            <InputField
              isRequired
              type="tel"
              label="Cep Tel"
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              startContent={<span className="text-default-500 dark:text-dark-50 text-xs">+90</span>}
              onChange={handleChange('phone')}
            />
          </div>
        </Card>
        <Card extraClass='flex-1 w-full flex gap-4 flex-col min-w-[300px]'>
          <TitleWithIcon
            title='Tebligat Bilgileri'
          />
          <div className='grid xl:grid-cols-2 gap-x-4 gap-y-2'>
            <SelectBox
              label="Durum"
              items={statusSelections}
              placeholder="Seçiniz"
              onChange={handleChange('status')}
              defaultSelectedKeys={[formData.status]}
            />
            <InputField
              type="date"
              label="Alınma Tarihi"
              placeholder='doldurunuz..'
              value={formData.deliveryDate}
              onChange={handleChange('deliveryDate')}
            />
            <InputField
              type="text"
              label="Teslim Alan"
              placeholder='doldurunuz..'
              onChange={handleChange('deliveryName')}
            />
            <InputField
              type="tel"
              label="Teslim Alan Tel"
              startContent={<span className="text-default-500 dark:text-dark-50 text-xs">+90</span>}
              placeholder='doldurunuz..'
              onChange={handleChange('deliveryPhone')}
            />
            <InputField
              type="text"
              label="Yakını"
              placeholder='doldurunuz..'
              onChange={handleChange('deliveryRelative')}
            />
            <InputField
              type="text"
              label="Mahalle"
              placeholder='doldurunuz..'
              onChange={handleChange('mahalle')}
            />
          </div>
          <TextAreaField
            label="Not"
            placeholder='doldurunuz..'
            onChange={handleChange('note')}
          />
        </Card>
      </div>
      <SubmitButton className='flex mx-auto w-full max-w-[300px] my-4' isLoading={isLoading} isDisabled={isDisabled}>Yeni Tebligat Ekle</SubmitButton>
    </form>
  )
}

export default TebligatEkle

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { splitName } from '@/utils/helpers';
import { getSelections, statusSelections } from '@/utils/form';
import SELECTORS from '@/store/selectors';
import { updateNotificationAction } from '@/store/actionCreators';
import { Button } from '@nextui-org/react'
import Card from '@/components/card';
import InputField from '@/components/form/InputField';
import SubmitButton from '@/components/form/SubmitButton';
import TitleWithIcon from '@/components/title';
import SelectBox from '@/components/select';
import Chip from '@/components/chip';
import TextAreaField from '@/components/form/TextAreaField';

function EditForm({ notification }) {
  const dispatch = useDispatch();
  const [isViewSendBox, setIsViewSendBox] = useState(false);
  const user = useSelector(SELECTORS.getUser);
  const isLoading = useSelector(SELECTORS.getNotificationsLoading);
  const categories = useSelector(SELECTORS.getCategories);
  const categoriesSelections = getSelections(categories, { value: 'name', label: 'name' });
  const currentDate = moment().format('YYYY-MM-DD');
  const deliveredText = `SAYIN ${notification.name.toUpperCase()}, 1 ADET TEBLİGATINIZ ${moment(currentDate).format('DD.MM.YYYY')} TARİHİNDE ${notification.deliveryName} KİŞİSİNE TESLİM EDİLMİŞTİR. MUHTAR ${user.name}.`;
  const undeliveredText = `SAYIN ${notification.name.toUpperCase()}, 1 ADET ALINMAMIŞ TEBLİGATINIZ İÇİN LÜTFEN MUHTARLIĞIMIZA UĞRAYINIZ. MUHTAR ${user.name}.`;
  const [messageText, setMessageText] = useState(notification.status == 1 ? deliveredText : undeliveredText);
  const { updated_at: updatedAt, deleted_at: deletedAt } = notification;
  const isDeleted = deletedAt;

  const initialStates = {
    date: notification.date,
    tcNo: notification.tcNo,
    name: notification.name,
    phone: notification.phone,
    category: notification.category,
    status: notification.status,
    deliveryDate: notification.deliveryDate,
    deliveryName: notification.deliveryName,
    deliveryPhone: notification.deliveryPhone,
    deliveryRelative: notification.deliveryRelative,
    mahalle: notification.mahalle,
    note: notification.note,
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["name", "tcNo", "date", "phone"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  useEffect(() => {
    if (formData.status === '1') {
      setFormData({
        ...formData,
        deliveryDate: currentDate
      });
      setMessageText(deliveredText);
    } else {
      setFormData({
        ...formData,
        deliveryDate: ''
      });
      setMessageText(undeliveredText);
    }
  }, [formData.status])

  const handleSubmit = (e) => {
    e.preventDefault();
    const notificationID = notification.id;
    const data = {
      ...formData,
      updated_at: currentDate
    };

    dispatch(updateNotificationAction({ id: notificationID, data }));
  };

  const handleAddBack = (e) => {
    e.preventDefault();
    const notificationID = notification.id;
    const data = {
      ...formData,
      updated_at: currentDate,
      deleted_at: null
    };

    dispatch(updateNotificationAction({ id: notificationID, data }));
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-start my-4'>
      {isDeleted ? (
        <>
          <Chip item={{ type: 'error', value: `Bu tebligat ${moment(deletedAt).format("DD.MM.YYYY")} tarihinde silinmiş!` }} />
          <Button onClick={handleAddBack} size='sm' variant='flat'>
            Tebligatı Geri Ekle
          </Button>
        </>
      ) : (
        <Chip item={{ type: 'info', value: `Son güncelleme: ${moment(updatedAt).format("DD.MM.YYYY")}` }} />
      )}

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
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('date')}
              value={formData.date}
            />
            <SelectBox
              label="Konusu"
              items={categoriesSelections}
              placeholder="Seçiniz"
              onChange={handleChange('category')}
              defaultSelectedKeys={[formData.category]}
            />
            <InputField
              isRequired
              type="text"
              label="TC No"
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('tcNo')}
              value={formData.tcNo}
            />
            <InputField
              isRequired
              type="text"
              label="Ad Soyad"
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('name')}
              value={formData.name}
            />
            <InputField
              isRequired
              type="text"
              label="Cep Tel"
              startContent={<span className="text-default-500 dark:text-dark-50 text-xs">+90</span>}
              placeholder='doldurunuz..'
              errorMessage='Lütfen bu alanı doldurun.'
              onChange={handleChange('phone')}
              value={formData.phone}
            />
          </div>
        </Card>
        <Card extraClass='flex-1 w-full flex gap-4 flex-col min-w-[300px]'>
          <TitleWithIcon
            title='Tebligat Düzenle'
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
              onChange={handleChange('deliveryDate')}
              value={formData.deliveryDate}
            />
            <InputField
              type="text"
              label="Teslim Alan"
              placeholder='doldurunuz..'
              onChange={handleChange('deliveryName')}
              value={formData.deliveryName}
            />
            <InputField
              type="tel"
              label="Teslim Alan Tel"
              placeholder='doldurunuz..'
              startContent={<span className="text-default-500 dark:text-dark-50 text-xs">+90</span>}
              onChange={handleChange('deliveryPhone')}
              value={formData.deliveryPhone}
            />
            <InputField
              type="text"
              label="Yakını"
              placeholder='doldurunuz..'
              onChange={handleChange('deliveryRelative')}
              value={formData.deliveryRelative}
            />
            <InputField
              type="text"
              label="Mahalle"
              placeholder='doldurunuz..'
              onChange={handleChange('mahalle')}
              value={formData.mahalle}
            />
          </div>
          <TextAreaField
            label="Not"
            placeholder='doldurunuz..'
            onChange={handleChange('note')}
            value={formData.note}
          />
        </Card>
      </div>
      {!isDeleted && (
        <div className='flex flex-col gap-4 w-full max-w-[400px] mx-auto'>
          <SubmitButton isLoading={isLoading} isDisabled={isDisabled}>Tebligat Düzenle</SubmitButton>

          <Button
            className='cursor-pointer text-white'
            onClick={() => setIsViewSendBox(!isViewSendBox)}
            color='warning'
          >
            Bilgilendirme Gönder
          </Button>
          {isViewSendBox && (
            <Card extraClass='flex-1 w-full flex gap-4 flex-col w-full'>
              <TitleWithIcon
                title='Mesaj Gönder'
              />
              <p className='text-sm text-black dark:text-white uppercase'>{messageText}</p>
              <div className='flex gap-2'>
                <Button
                  color='success'
                  className='text-white'
                  as={Link}
                  target='_blank'
                  href={`https://api.whatsapp.com/send?phone=+90${notification.phone}&text=${messageText}`}
                >
                  Whatsapp
                </Button>
                <Button color='primary'>SMS Gönder</Button>
                <Button color='danger' onClick={() => setIsViewSendBox(false)}>İptal et</Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </form>
  );
};

export default EditForm;

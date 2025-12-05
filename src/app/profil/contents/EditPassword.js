"use client"

import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { useState } from 'react';
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { updateUserAction } from '@/store/actionCreators';
import SELECTORS from '@/store/selectors';
import Chip from '@/components/chip';

function EditPassword({ editUserByAdmin }) {
  const dispatch = useDispatch();
  const stateUserID = useSelector(SELECTORS.getUserID);
  const userID = editUserByAdmin?.id || stateUserID;
  const isLoading = useSelector(SELECTORS.getUserLoading);
  const error = useSelector(SELECTORS.getUserError);

  const [formData, setFormData] = useState({
    password: '',
    newPassword: ''
  });

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = moment().format("YYYY-DD-MM");

    const data = {
      password: editUserByAdmin ? formData.newPassword : formData.password,
      ...(!editUserByAdmin && { newPassword: formData.newPassword }),
      updated_at: currentDate,
    };
    dispatch(updateUserAction({ id: userID, data }));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[500px]">
      {!editUserByAdmin && (
        <InputField
          type='text'
          label='Mevcut Şifre'
          isRequired
          placeholder="Mevcut Şifre giriniz.."
          onChange={handleChange('password')}
          value={formData.password}
        />
      )}
      <InputField
        type='text'
        label='Yeni Şifre'
        isRequired
        placeholder="Yeni Şifre giriniz.."
        onChange={handleChange('newPassword')}
        value={formData.newPassword}
      />
      {error && <Chip className='p-2 min-w-full max-w-full' item={{ type: 'error', value: error }} />}
      <SubmitButton
        isLoading={isLoading}
        isDisabled={((!formData.password && !editUserByAdmin) || !formData.newPassword)}
      >
        Şifre Değiştir
      </SubmitButton>
    </form>
  )
}

export default EditPassword

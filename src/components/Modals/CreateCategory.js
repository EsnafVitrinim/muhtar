import React, { useState } from 'react'
import ModalUI from '../modal'
import InputField from '../form/InputField';
import SubmitButton from '../form/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateCategoryModal } from '@/store/reducers/ui/uiReducer';
import SELECTORS from '@/store/selectors';
import Chip from '../chip';
import { createCategoryAction } from '@/store/actionCreators';
import { generateUniqueID } from '@/utils/helpers';
import moment from 'moment';

function CreateCategory() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(SELECTORS.getCreateCategoryModal);
  const error = useSelector(SELECTORS.getCategoriesError);
  const isLoading = useSelector(SELECTORS.getCategoriesLoading);

  const initialState = { name: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!!formData.name) {
      const uniqueID = generateUniqueID();
      const createdAt = moment().format('YYYY-MM-DD');

      const data = {
        ...formData,
        created_at: createdAt,
        keyValue: uniqueID
      }
      dispatch(createCategoryAction(data));
      setFormData(initialState);
    }
  };

  return (
    <ModalUI
      open={isModalOpen}
      onClose={() => dispatch(setCreateCategoryModal(false))}
      modalTitle='Kategori Olustur'
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputField
          autoFocus
          type='text'
          label='Kategori'
          isRequired
          placeholder="Kategori adı giriniz.."
          onChange={handleChange('name')}
          maxLength={200}
          value={formData.name}
        />
        {error && <Chip className='p-2 min-w-full max-w-full' item={{ type: 'error', value: error }} />}
        <SubmitButton
          isLoading={isLoading}
          isDisabled={!formData.name}
        >
          Kategori Ekle
        </SubmitButton>
      </form>
    </ModalUI>
  )
}

export default CreateCategory

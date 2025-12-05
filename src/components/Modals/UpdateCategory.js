import React, { useEffect, useState } from 'react'
import ModalUI from '../modal'
import InputField from '../form/InputField';
import SubmitButton from '../form/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateCategoryModal } from '@/store/reducers/ui/uiReducer';
import SELECTORS from '@/store/selectors';
import Chip from '../chip';
import { updateCategoryAction } from '@/store/actionCreators';

function UpdateCategory() {
  const dispatch = useDispatch();
  const updateModal = useSelector(SELECTORS.getUpdateCategoryModal);
  const { data: category, isOpen } = updateModal;
  const error = useSelector(SELECTORS.getCategoriesError);
  const isLoading = useSelector(SELECTORS.getCategoriesLoading);

  const initialState = { name: category.name };
  const [formData, setFormData] = useState({});

  useEffect(() => { setFormData(initialState) }, [category])

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!!formData.name) {
      const data = formData
      dispatch(updateCategoryAction({ id: category.id, data }));
      dispatch(setUpdateCategoryModal({ data: {}, isOpen: false }));
    }
  };

  return (
    <ModalUI
      open={isOpen}
      onClose={() => dispatch(setUpdateCategoryModal({ data: {}, isOpen: false }))}
      modalTitle='Kategori Düzenle'
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
          Kategori Düzenle
        </SubmitButton>
      </form>
    </ModalUI>
  )
}

export default UpdateCategory

'use client';

import { FormInput } from './FormInput';
import Image from 'next/image';
import { useProcedureForm } from '@/hooks/useProcedureForm';

export const ProcedureForm = () => {
  const {
    onBlurInput,
    onClickDelete,
    onClickSaveEdit,
    isEditProcedure,
    onSubmitForm,
    procedureFormRef,
    onHandleEnter,
  } = useProcedureForm();

  return (
    <div>
      <h2 className='mb-3'>{isEditProcedure ? 'Edit' : 'Add'} Procedure</h2>
      <form onSubmit={onSubmitForm} ref={procedureFormRef} className='flex flex-row gap-x-5'>
        <FormInput
          required
          onBlur={onBlurInput}
          inputClass=''
          id='description'
          label='Description'
          name='description'
          placeholder='Description'
          type='text'
          onHandleEnter={onHandleEnter}
        />
        {isEditProcedure && (
          <div className='flex flex-row gap-x-3'>
            <button className='relative h-7 w-7 object-cover' type='button' onClick={onClickSaveEdit}>
              <Image src='/edit.svg' fill sizes='28' alt='edit' />
            </button>
            <button className='relative h-7 w-7 object-cover' type='button' onClick={onClickDelete}>
              <Image src='/delete.svg' fill sizes='28' alt='delete' />
            </button>
          </div>
        )}
        {isEditProcedure ? null : (
          <button type='submit' className='hidden' hidden>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

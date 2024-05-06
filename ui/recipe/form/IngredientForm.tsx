'use client';

import { useIngredientForm } from '@/hooks/useIngredientForm';
import { FormInput } from './FormInput';
import Image from 'next/image';

export const IngredientForm = () => {
  const { onBlurInput, onClickDelete, onClickSaveEdit, isEditIngredient, onSubmitForm, recipeFormRef } =
    useIngredientForm();

  return (
    <div>
      <h2 className='mb-3'>{isEditIngredient ? 'Edit' : 'Add'} Ingredient</h2>
      <form onSubmit={onSubmitForm} ref={recipeFormRef} className='flex flex-row gap-x-5'>
        <FormInput
          required
          onBlur={onBlurInput}
          inputClass=''
          id='size'
          label='Size'
          name='size'
          placeholder='Size'
          type='text'
        />
        <FormInput
          required
          onBlur={onBlurInput}
          inputClass='w-16'
          id='unit'
          label='Unit'
          name='unit'
          placeholder='Unit'
          type='text'
        />
        <FormInput
          required
          onBlur={onBlurInput}
          inputClass=''
          id='name'
          label='Name'
          name='name'
          placeholder='Name'
          type='text'
        />
        {isEditIngredient && (
          <div className='flex flex-row gap-x-3'>
            <button className='relative h-7 w-7 object-cover' type='button' onClick={onClickSaveEdit}>
              <Image src='/edit.svg' fill sizes='28' alt='edit' />
            </button>
            <button className='relative h-7 w-7 object-cover' type='button' onClick={onClickDelete}>
              <Image src='/delete.svg' fill sizes='28' alt='delete' />
            </button>
          </div>
        )}
        {!isEditIngredient ? (
          <button type='submit' className='hidden' hidden>
            Submit
          </button>
        ) : null}
      </form>
    </div>
  );
};

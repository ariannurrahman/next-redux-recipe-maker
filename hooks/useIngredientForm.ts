import {
  addIngredient,
  deleteIngredient,
  deselectIngredient,
  updateIngredient,
} from '@/lib/features/ingredient/ingredientSlice';
import { FormEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/lib/hooks';

export const useIngredientForm = () => {
  const recipeFormRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const selectedIngredient = useAppSelector((state) => state.ingredient.selected);

  const isEditIngredient = !!selectedIngredient;

  useEffect(() => {
    if (!recipeFormRef.current) return;
    if (!selectedIngredient) return;

    // Initialize input values when the form component mounts
    recipeFormRef.current.querySelector<HTMLInputElement>('input[name="name"]')!.value = selectedIngredient.name;
    recipeFormRef.current.querySelector<HTMLInputElement>('input[name="unit"]')!.value = selectedIngredient.unit;
    recipeFormRef.current.querySelector<HTMLInputElement>('input[name="size"]')!.value = selectedIngredient.size;
  }, [selectedIngredient]);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipeFormRef.current) return;
    const payload = {
      name: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="name"]')?.value || '',
      unit: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="unit"]')?.value || '',
      size: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="size"]')?.value || '',
      id: uuidv4(),
    };

    dispatch(
      addIngredient({
        ...payload,
      }),
    );

    recipeFormRef.current.reset();
  };

  const onClickSaveEdit = () => {
    if (recipeFormRef.current && selectedIngredient) {
      const payload = {
        name: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="name"]')?.value || '',
        unit: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="unit"]')?.value || '',
        size: recipeFormRef.current.querySelector<HTMLInputElement>('input[name="size"]')?.value || '',
        id: selectedIngredient.id,
      };

      dispatch(updateIngredient(payload));

      recipeFormRef.current.reset();
      dispatch(deselectIngredient());
    }
  };

  const onClickDelete = () => {
    if (recipeFormRef.current) {
      dispatch(deleteIngredient(selectedIngredient));
      dispatch(deselectIngredient());
      recipeFormRef.current.reset();
    }
  };

  const onBlurInput = () => {
    if (recipeFormRef.current && selectedIngredient) {
      onClickSaveEdit();
    }
  };

  return {
    onBlurInput,
    onClickDelete,
    onClickSaveEdit,
    isEditIngredient,
    onSubmitForm,
    recipeFormRef,
  };
};

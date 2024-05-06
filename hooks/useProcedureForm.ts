import { FormEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/lib/hooks';
import {
  addProcedure,
  deleteProcedure,
  deselectProcedure,
  updateProcedure,
} from '@/lib/features/procedure/procedureSlice';

export const useProcedureForm = () => {
  const procedureFormRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const selectedProcedure = useAppSelector((state) => state.procedure.selected);

  const isEditProcedure = !!selectedProcedure;

  useEffect(() => {
    if (!procedureFormRef.current) return;
    if (!selectedProcedure) return;

    // Initialize input values when the form component mounts
    procedureFormRef.current.querySelector<HTMLInputElement>('input[name="description"]')!.value =
      selectedProcedure.description;
  }, [selectedProcedure]);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!procedureFormRef.current) return;
    const payload = {
      description: procedureFormRef.current.querySelector<HTMLInputElement>('input[name="description"]')?.value || '',
      id: uuidv4(),
    };
    dispatch(
      addProcedure({
        ...payload,
      }),
    );

    procedureFormRef.current.reset();
  };

  const onClickSaveEdit = () => {
    if (procedureFormRef.current && selectedProcedure) {
      const payload = {
        description: procedureFormRef.current.querySelector<HTMLInputElement>('input[name="description"]')?.value || '',
        id: selectedProcedure.id,
      };

      dispatch(updateProcedure(payload));

      procedureFormRef.current.reset();
      dispatch(deselectProcedure());
    }
  };

  const onClickDelete = () => {
    if (procedureFormRef.current) {
      dispatch(deleteProcedure(selectedProcedure));
      dispatch(deselectProcedure());
      procedureFormRef.current.reset();
    }
  };

  const onBlurInput = () => {
    if (procedureFormRef.current && selectedProcedure) {
      onClickSaveEdit();
    }
  };

  const onHandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isEditProcedure) {
      e.preventDefault();
    }
  };

  return {
    onBlurInput,
    onClickDelete,
    onClickSaveEdit,
    isEditProcedure,
    onSubmitForm,
    procedureFormRef,
    onHandleEnter,
  };
};

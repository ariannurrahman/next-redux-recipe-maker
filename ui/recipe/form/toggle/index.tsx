'use client';

import { useEffect, useState } from 'react';
import { IngredientForm } from '../IngredientForm';
import { ProcedureForm } from '../ProcedureForm';

const IDLE_DURATION = 10000;

export const FormToggle = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;

    const resetIdleTimeout = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        setIdle(true);
      }, IDLE_DURATION);
    };

    resetIdleTimeout();

    const handleUserInteraction = () => {
      setIdle(false);
      resetIdleTimeout();
    };

    document.addEventListener('mousedown', handleUserInteraction);

    return () => {
      document.removeEventListener('mousedown', handleUserInteraction);
      clearTimeout(idleTimeout);
    };
  }, []);

  useEffect(() => {
    if (!idle) {
      setIsShowForm(true);
    } else {
      setIsShowForm(false);
    }
  }, [idle]);

  return !isShowForm ? (
    <button className='italic font-semibold text-xl'>Click anywhere to show the forms</button>
  ) : (
    <div className='flex flex-col gap-y-5'>
      <IngredientForm />
      <ProcedureForm />
    </div>
  );
};

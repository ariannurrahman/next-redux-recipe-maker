'use client';

import { deselectIngredient, Ingredient, selectIngredient } from '@/lib/features/ingredient/ingredientSlice';
import { deselectProcedure, Procedure, selectProcedure } from '@/lib/features/procedure/procedureSlice';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';

export const RecipeList = () => {
  const ingredients = useAppSelector((state) => state.ingredient);
  const procedure = useAppSelector((state) => state.procedure);
  const dispatch = useDispatch();

  const onClickUpdateItem = (type: 'procedure' | 'ingredient', value: Ingredient | Procedure) => {
    if (type === 'ingredient') {
      if (procedure.selected) {
        dispatch(deselectProcedure());
      }

      dispatch(selectIngredient(value));
    }
    if (type === 'procedure') {
      if (ingredients.selected) {
        dispatch(deselectIngredient());
      }
      dispatch(selectProcedure(value));
    }
  };

  return (
    <div className='space-y-5 w-full'>
      <h2 className='font-semibold text-xl'>Ingredient List</h2>
      <div className='flex flex-col gap-y-3'>
        {ingredients.list.length ? (
          ingredients.list.map((ingredient) => {
            const { id, name, size, unit } = ingredient;
            return (
              <div
                onClick={() => onClickUpdateItem('ingredient', ingredient)}
                className='p-5 text-center rounded-xl border bg-card text-card-foreground shadow'
                key={id}
              >
                {size} {unit} - {name}
              </div>
            );
          })
        ) : (
          <p className='text-gray-700 underline-offset-2 underline'>Add ingredients first...</p>
        )}
      </div>
      <h2 className='font-semibold text-xl'>Procedure List</h2>
      <div className='flex flex-col gap-y-3'>
        {procedure?.list.length ? (
          procedure.list.map((eachProcedure, index) => {
            const { id, description } = eachProcedure;
            return (
              <div
                onClick={() => onClickUpdateItem('procedure', eachProcedure)}
                className='p-5 text-center rounded-xl border bg-card text-card-foreground shadow'
                key={id}
              >
                {index + 1}. {description}
              </div>
            );
          })
        ) : (
          <p className='text-gray-700 underline-offset-2 underline'>Add procedures first...</p>
        )}
      </div>
    </div>
  );
};

jest.mock('../../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn(() =>
    Promise.resolve([
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image.png',
        image_mobile: 'image-mobile.png',
        image_large: 'image-large.png'
      }
    ])
  )
}));

import { fetchIngredients, ingredientsReducer } from '../burgerContentSlice';
import { TIngredient } from '@utils-types';

describe('burgerContentSlice reducer', () => {
  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image.png',
    image_mobile: 'image-mobile.png',
    image_large: 'image-large.png'
  };

  it('should handle initial state', () => {
    const state = ingredientsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = fetchIngredients.fulfilled([mockIngredient], '');
    const state = ingredientsReducer(undefined, action);
    expect(state.ingredients).toEqual([mockIngredient]);
  });
});

import {
  createBurgerSlice,
  addItem,
  deleteItem,
  upItem,
  downItem
} from '../createBurgerSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 40,
  carbohydrates: 120,
  calories: 420,
  price: 125,
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png'
};

const mockMainIngredient: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 50,
  fat: 20,
  carbohydrates: 10,
  calories: 200,
  price: 100,
  image: 'main.png',
  image_mobile: 'main-mobile.png',
  image_large: 'main-large.png'
};

const mockSauceIngredient: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус',
  type: 'sauce',
  proteins: 5,
  fat: 10,
  carbohydrates: 15,
  calories: 50,
  price: 30,
  image: 'sauce.png',
  image_mobile: 'sauce-mobile.png',
  image_large: 'sauce-large.png'
};

describe('createBurgerSlice reducer', () => {
  it('should handle initial state', () => {
    expect(createBurgerSlice.reducer(undefined, { type: '' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('should add bun with generated id', () => {
    const action = addItem(mockBun);
    const state = createBurgerSlice.reducer(undefined, action);
    expect(state.bun).toMatchObject(mockBun);
    expect(state.bun?.id).toBeDefined();
  });

  it('should add ingredient with generated id', () => {
    const action = addItem(mockMainIngredient);
    const state = createBurgerSlice.reducer(undefined, action);
    expect(state.ingredients[0]).toMatchObject(mockMainIngredient);
    expect(state.ingredients[0]?.id).toBeDefined();
  });

  it('should delete ingredient by id', () => {
    const initialState = {
      bun: null,
      ingredients: [{ ...mockMainIngredient, id: 'test-id' }]
    };
    const action = deleteItem({ id: 'test-id', type: 'main' });
    const state = createBurgerSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual([]);
  });

  describe('moving ingredients', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...mockMainIngredient, id: '1' },
        { ...mockSauceIngredient, id: '2' },
        { ...mockMainIngredient, id: '3' }
      ]
    };

    it('should move ingredient up', () => {
      const action = upItem({ id: '2' });
      const state = createBurgerSlice.reducer(initialState, action);

      expect(state.ingredients[0].id).toBe('2');
      expect(state.ingredients[1].id).toBe('1');
      expect(state.ingredients[2].id).toBe('3');
    });

    it('should not move first ingredient up', () => {
      const action = upItem({ id: '1' });
      const state = createBurgerSlice.reducer(initialState, action);
      expect(state.ingredients).toEqual(initialState.ingredients);
    });

    it('should move ingredient down', () => {
      const action = downItem({ id: '2' });
      const state = createBurgerSlice.reducer(initialState, action);
      expect(state.ingredients[0].id).toBe('1');
      expect(state.ingredients[1].id).toBe('3');
      expect(state.ingredients[2].id).toBe('2');
    });

    it('should not move last ingredient down', () => {
      const action = downItem({ id: '3' });
      const state = createBurgerSlice.reducer(initialState, action);
      expect(state.ingredients).toEqual(initialState.ingredients);
    });
  });
});

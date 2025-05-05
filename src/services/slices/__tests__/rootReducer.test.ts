import { rootReducer } from '@/services/store';
import { ingredientsReducer } from '../burgerContentSlice';
import { burgerConstructorReducer } from '../createBurgerSlice';

describe('rootReducer', () => {
  it('should combine all reducers correctly', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});

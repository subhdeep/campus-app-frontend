import { userAdapter, UserState } from '../reducers/users.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

export const getUserState = createFeatureSelector<State, UserState>('user');

export const getLoading = createSelector(getUserState, state => state.loading);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = userAdapter.getSelectors(getUserState);

import { Type } from '@angular/core';

import { AppContainer } from './app';
import { NotFoundContainer } from './not-found';

export const containers: Type<any>[] = [AppContainer, NotFoundContainer];

export * from './app';
export * from './not-found';

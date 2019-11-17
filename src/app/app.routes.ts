import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent,
    data: { title: 'Recipes List' }
  },
  { path: 'recipes/new', component: RecipeFormComponent },
  { path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
]
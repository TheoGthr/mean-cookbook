import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { MaterialModule } from '../material.module';
import { RecipeService } from './recipe.service';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    RecipeListComponent,
    RecipeFormComponent
  ],
  exports: [
    RecipeListComponent,
    RecipeFormComponent
  ],
  providers: [RecipeService]
})
export class RecipesModule { }

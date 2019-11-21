import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { MaterialModule } from '../material.module';
import { RecipeService } from './recipe.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecipeListComponent,
    RecipeFormComponent,
    RecipeDetailsComponent
  ],
  exports: [
    RecipeListComponent,
    RecipeFormComponent,
    RecipeDetailsComponent
  ],
  providers: [RecipeService]
})
export class RecipesModule { }

import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    BrowserModule
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

import { SearchService } from './services/search.service';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { MaterialModule } from '../material.module';
import { RecipeService } from './services/recipe.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule
  ],
  declarations: [
    RecipeListComponent,
    RecipeFormComponent,
    RecipeDetailsComponent
  ],
  exports: [
    RecipeListComponent,
    RecipeFormComponent,
    RecipeDetailsComponent,
    TranslateModule
  ],
  providers: [
    RecipeService,
    SearchService
  ]
})
export class RecipesModule { }

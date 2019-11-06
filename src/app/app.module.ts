import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';

const appRoutes: Routes = [
  { path: 'recipes/:id',      component: RecipeDetailsComponent },
  {
    path: 'recipes',
    component: RecipeListComponent,
    data: { title: 'Recipes List' }
  },
  { path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  { path: '**', component: RecipeListComponent } // PageNotFoundComponent }
];



@NgModule({
  declarations: [AppComponent, RecipeDetailsComponent, RecipeListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

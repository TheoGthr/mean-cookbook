import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, RecipeDetailsComponent, RecipeListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

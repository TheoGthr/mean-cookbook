export interface Recipe {
  _id?: string;
  name: string;
  cookTime: number;
  ingredients: Ingredient[];
  directions: string[];
  category: RecipeCategories;
}

export interface Ingredient {
  label: string;
  quantity: string;
}

export enum RecipeCategories {
  APPETIZER = 'Appetizer',
  STARTER = 'Starter',
  MAIN = 'Main',
  DESSERT = 'Dessert',
  BEVERAGE = 'Beverage',
  MISC = 'Misc.'
}
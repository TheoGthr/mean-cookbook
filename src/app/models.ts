export interface Recipe {
  _id?: string;
  name: string;
  cookTime: number;
  ingredients: Ingredient[];
  directions: string[];
  category: RecipeCategories;
  createDate?: any;
}

export interface RecipeShort {
  _id?: string;
  name: string;
  category: RecipeCategories;
}

export interface Ingredient {
  label: string;
  quantity: string;
}

export enum RecipeCategories {
  APPETIZER = 'cat.appetizer',
  STARTER = 'cat.starter',
  MAIN = 'cat.main',
  DESSERT = 'cat.dessert',
  BEVERAGE = 'cat.beverage',
  MISC = 'cat.misc'
}

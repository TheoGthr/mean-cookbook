export interface Recipe {
  _id?: string;
  name: string;
  cookTime: number;
  ingredients: string;
  directions: string;
  category: RecipeCategories;
}

export enum RecipeCategories {
  APPETIZER = 'Appetizer',
  STARTER = 'Starter',
  MAIN = 'Main',
  DESSERT = 'Dessert',
  BEVERAGE = 'Beverage',
  MISC = 'Misc.'
}
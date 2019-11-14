export interface Recipe {
  _id?: string;
  name: string;
  time: Date;
  ingredients: string;
  process: string;
  type: RecipeTypes;
}

export enum RecipeTypes {
  APPETIZER = 'APPETIZER',
  STARTER = 'STARTER',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
  MISC = 'MISC'
}

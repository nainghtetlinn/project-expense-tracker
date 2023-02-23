import Joi from "joi";

export interface ExpenseType {
  title: string;
  amount: number;
  type: "earn" | "spend";
  date: number;
  id: string;
}
export const ExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid("earn", "spend"),
});

import { compareAsc, startOfDay } from "date-fns";
import parseISO from "date-fns/parseISO";
import { isDate } from "../useUtils";
import { ValidationRuleFunction } from "./useValidator";

const required: ValidationRuleFunction<unknown> = (target) => target !== undefined && target !== null;

const notEmpty: ValidationRuleFunction<unknown[]> = (target) => target && target.length > 0;

const isType: ValidationRuleFunction<unknown> = (target, type) => typeof target === type;

const numberType: ValidationRuleFunction<unknown> = (target) => isType(target, "number");

const stringType: ValidationRuleFunction<unknown> = (target) => isType(target, "string");

const booleanType: ValidationRuleFunction<unknown> = (target) => isType(target, "boolean");

const objectType: ValidationRuleFunction<unknown> = (target) => isType(target, "object");

const arrayType: ValidationRuleFunction<unknown> = (target) => Array.isArray(target);

const between: ValidationRuleFunction<number> = (target, min: number, max: number) => numberType(target) &&
  numberType(min) &&
  numberType(max) &&
  min < target && target < max;

const dateType: ValidationRuleFunction<string> = (target) => required(target) && isDate(target as unknown as string);

const dateBefore: ValidationRuleFunction<string> = (target, dateToCompare: string) => dateType(target) &&
  compareAsc(startOfDay(parseISO(target)), startOfDay(parseISO(dateToCompare))) <= 0;

const dateAfter: ValidationRuleFunction<string> = (target, dateToCompare: string) => dateType(target) &&
  compareAsc(startOfDay(parseISO(target)), startOfDay(parseISO(dateToCompare))) >= 0;

export const validators = {
  required,
  isType,
  number: numberType,
  string: stringType,
  boolean: booleanType,
  object: objectType,
  array: arrayType,
  between,
  date: dateType,
  dateBefore,
  dateAfter,
  notEmpty
};

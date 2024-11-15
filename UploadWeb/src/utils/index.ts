import { ISearchParams } from "@/services/dtos/public";

export const replaceWithLatest = (
  newValue: { [key: string]: boolean },
  oldValue: ISearchParams[]
) => {
  try {
    return oldValue.map((oItem) => {
      if (newValue.hasOwnProperty(oItem.jsonObjKeyName)) {
        return { ...oItem, open: newValue[oItem.jsonObjKeyName] };
      }
      return oItem;
    });
  } catch (error) {
    return oldValue;
  }
};

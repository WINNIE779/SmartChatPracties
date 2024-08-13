export interface IKnowListProps {
  id: number;
  name: string;
  describe: string;
}

export enum KnowEnum {
  Universal,
  Alone,
}

export enum KnowAddEnum {
  Know,
  Training,
}

export interface IKnowOptionProps {
  label: string;
  value: KnowEnum;
}

export interface IKnowOptionsProps {
  label: string;
  value: KnowEnum;
}

export enum SkillType {
  QAType,
  KnowType,
  TableType,
}

export const SkillTypeText = {
  [SkillType.KnowType]: "知識類",
  [SkillType.QAType]: "問答類",
  [SkillType.TableType]: "表格類",
};

export interface IPagination {
  page: number;
  pageSize: number;
  total?: number;
  loading?: boolean;
}

export interface ISkillDataProps {
  name: string;
  type: SkillType;
  traningValue: IKnowListProps[];
}

export const skillTypeOption = [
  { value: SkillType.QAType, label: SkillTypeText[SkillType.QAType] },
  { value: SkillType.KnowType, label: SkillTypeText[SkillType.KnowType] },
  { value: SkillType.TableType, label: SkillTypeText[SkillType.TableType] },
];

export interface IntentsParams extends IPagesDto {
  Keyword: string;
  CollectionType: SkillType[];
}

export interface IntentsDto {
  result: IntentsResultProps[];
  totalCount: number;
}

export interface IPagesDto {
  PageSize: number;
  PageIndex: number;
}

export interface ISearchDto {
  Keyword: string;
  CollectionType: SkillType[];
}

export enum SkillType {
  QuestionAndAnswerType,
  KnowledgeType,
  TableType,
}

export const SkillTextType = {
  [SkillType.QuestionAndAnswerType]: "問答類",
  [SkillType.KnowledgeType]: "知識類",
  [SkillType.TableType]: "表格類",
};

export interface IntentsResultProps {
  id: number;
  chatID: number;
  name: string;
  description?: string;
  collectionType: SkillType;
  createdBy?: number;
  createdDate: string;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  collections?: string;
  trainStatus?: number;
  flowStatus?: boolean;
  status?: ISkillCardStatus;
}

export enum ISkillCardStatus {
  Pending = 10,
  InTraining = 20,
  Completed = 30,
  Failed = 40,
}

export const ISkillCardStatusText = {
  [ISkillCardStatus.Pending]: "等待中",
  [ISkillCardStatus.InTraining]: "訓練中",
  [ISkillCardStatus.Completed]: "已完成",
  [ISkillCardStatus.Failed]: "訓練失敗",
};

export const skillTypeOption: {
  value: SkillType;
  label: string;
}[] = [
  {
    value: SkillType.QuestionAndAnswerType,
    label: "問答類",
  },
  {
    value: SkillType.KnowledgeType,
    label: "知識類",
  },
  {
    value: SkillType.TableType,
    label: "表格類",
  },
];

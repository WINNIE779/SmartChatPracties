import {
  IModuleListSection,
  IdentifyFileSectionType,
} from "@/services/dtos/public";

export interface IPermissionStateProps {
  isGetPermission: boolean;
  hasAccessBackend: boolean;
}

export interface IModuleEditDtoProps {
  sectionId: number;
  name: string;
  departmentName: string;
  type: IdentifyFileSectionType;
  banner: string;
  title: string;
  description: string;
}

export interface IRouterMsgProps {
  type: IdentifyFileSectionType;
  section: IModuleListSection | null;
}

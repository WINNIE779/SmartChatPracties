import {
  IModuleEditDtoProps,
  IPermissionStateProps,
  IRouterMsgProps,
} from "./props";

import { IdentifyFileSectionType } from "@/services/dtos/public";
import { atom } from "recoil";

export const permissionState = atom<IPermissionStateProps>({
  key: "permissionState",
  default: {
    isGetPermission: false,
    hasAccessBackend: false,
  },
});

export const editDtoState = atom<IModuleEditDtoProps>({
  key: "editDto",
  default: {
    sectionId: -1,
    name: "",
    departmentName: "",
    type: IdentifyFileSectionType.OfficeDocument,
    banner: "",
    title: "",
    description: "",
  },
});

export const routerState = atom<IRouterMsgProps>({
  key: "routerState",
  default: {
    type: IdentifyFileSectionType.OfficeDocument,
    section: null,
  },
});

export const getSection = atom<boolean>({
  key: "getSection",
  default: true,
});

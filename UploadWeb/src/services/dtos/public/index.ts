import { DepartNameEnum } from "@/pages/upload/prop";
import { ISearchParams } from "../upload";

// ACH
export const AchSearchParams: ISearchParams[] = [
  {
    value: "授權人",
    open: true,
    description: "必填，僅英文",
    jsonObjKeyName: "授權人",
  },
  {
    value: "公司名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司名字",
  },
  {
    value: "餐館名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "餐館名字",
  },
  {
    value: "賬單地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "賬單地址",
  },
  {
    value: "電話",
    open: true,
    description: "必填",
    jsonObjKeyName: "電話",
  },
  {
    value: "城市,州,郵編",
    open: true,
    description: "必填",
    jsonObjKeyName: "城市,州,郵編",
  },
  {
    value: "郵箱",
    open: true,
    description: "必填",
    jsonObjKeyName: "郵箱",
  },
  {
    value: "賬戶類型",
    open: true,
    description: "必填",
    jsonObjKeyName: "賬戶類型",
  },
  {
    value: "賬戶名稱",
    open: true,
    description: "必填，和支票一致",
    jsonObjKeyName: "賬戶名稱",
  },
  {
    value: "銀行名稱",
    open: true,
    description: "必填，和支票一致",
    jsonObjKeyName: "銀行名稱",
  },
  {
    value: "賬號",
    open: true,
    description: "必填，和支票一致",
    jsonObjKeyName: "賬號",
  },
  {
    value: "銀行代碼",
    open: true,
    description: "必填，和支票一致",
    jsonObjKeyName: "銀行代碼",
  },
  {
    value: "銀行所在城市、州",
    open: true,
    description: "必填",
    jsonObjKeyName: "銀行所在城市、州",
  },
  {
    value: "簽名",
    open: true,
    description: "必填，需要和授權人一致",
    jsonObjKeyName: "簽名",
  },
  {
    value: "日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "日期",
  },
  {
    value: "賬戶名稱（支票）",
    open: true,
    description: "必填",
    jsonObjKeyName: "賬戶名稱（支票）",
  },
  {
    value: "銀行名稱（支票）",
    open: true,
    description: "必填",
    jsonObjKeyName: "銀行名稱（支票）",
  },
  {
    value: "賬號（支票）",
    open: true,
    description: "必填",
    jsonObjKeyName: "賬號（支票）",
  },
  {
    value: "銀行代碼（支票）",
    open: true,
    description: "必填",
    jsonObjKeyName: "銀行代碼（支票）",
  },
];

// 单店
export const CreditFormSingleParams: ISearchParams[] = [
  {
    value: "基本資料.公司名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.公司名字",
  },
  {
    value: "基本資料.商業登記名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.商業登記名字",
  },
  {
    value: "基本資料.餐館/實體地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.餐館/實體地址",
  },
  {
    value: "基本資料.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.城市",
  },
  {
    value: "基本資料.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.州",
  },
  {
    value: "基本資料.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.郵政編碼",
  },
  {
    value: "基本資料.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.商業登記號碼",
  },
  {
    value: "基本資料.聯邦號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.聯邦號碼",
  },
  {
    value: "基本資料.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.會計聯繫人",
  },
  {
    value: "基本資料.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.電話號碼",
  },
  {
    value: "基本資料.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.電郵地址",
  },
  {
    value: "基本資料.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.傳真號碼",
  },
  {
    value: "商業信息.業務類型",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.業務類型",
  },
  {
    value: "商業信息.公司成立的月/年",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.公司成立的月/年",
  },
  {
    value: "商業信息.預計月均銷售額",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.預計月均銷售額",
  },
  {
    value: "公司負責人資料.持有人",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.持有人",
  },
  {
    value: "公司負責人資料.電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.電話號碼",
  },
  {
    value: "公司負責人資料.家庭住址",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.家庭住址",
  },
  {
    value: "公司負責人資料.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.城市",
  },
  {
    value: "公司負責人資料.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.州",
  },
  {
    value: "公司負責人資料.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.郵政編碼",
  },
  {
    value: "銀行參考信息.銀行名稱",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行名稱",
  },
  {
    value: "銀行參考信息.銀行聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行聯絡人",
  },
  {
    value: "銀行參考信息.戶口號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.戶口號碼",
  },
  {
    value: "銀行參考信息.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.傳真號碼",
  },
  {
    value: "銀行參考信息.銀行地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行地址",
  },
  {
    value: "銀行參考信息.城市",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.城市",
  },
  {
    value: "銀行參考信息.州",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.州",
  },
  {
    value: "銀行參考信息.郵政編碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.郵政編碼",
  },
  {
    value: "簽名確認.姓名",
    open: true,
    description: "必填",
    jsonObjKeyName: "簽名確認.姓名",
  },
  {
    value: "簽名確認.簽名",
    open: true,
    description: "必填",
    jsonObjKeyName: "簽名確認.簽名",
  },
  {
    value: "簽名確認.職位",
    open: true,
    description: "必填",
    jsonObjKeyName: "簽名確認.職位",
  },
  {
    value: "簽名確認.日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "簽名確認.日期",
  },
  {
    value: "擔保人.擔保人簽名",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.擔保人簽名",
  },
  {
    value: "擔保人.擔保人名字",
    open: true,
    description: "必填，需要和擔保人簽名一致",
    jsonObjKeyName: "擔保人.擔保人名字",
  },
  {
    value: "擔保人.家庭地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.家庭地址",
  },
  {
    value: "擔保人.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.城市",
  },
  {
    value: "擔保人.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.州",
  },
  {
    value: "擔保人.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.郵政編碼",
  },
  {
    value: "擔保人.社會安全號",
    open: true,
    description:
      "必填，不能數字“9”開頭；不能數字“666”開頭；不能數字“000”開通；不能第4-5位數字為“00”；不能第6-9位數字為“0000”",
    jsonObjKeyName: "擔保人.社會安全號",
  },
  {
    value: "擔保人.駕駛執照號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.駕駛執照號碼",
  },
  {
    value: "擔保人.電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.電話號碼",
  },
  {
    value: "擔保人.職位",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.職位",
  },
  {
    value: "擔保人.日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.日期",
  },
];

// 多店
export const CreditFormMultipleParams: ISearchParams[] = [
  {
    value: "基本資料.公司名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.公司名字",
  },
  {
    value: "基本資料.商業登記名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.商業登記名字",
  },
  {
    value: "基本資料.餐館/實體地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.餐館/實體地址",
  },
  {
    value: "基本資料.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.城市",
  },
  {
    value: "基本資料.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.州",
  },
  {
    value: "基本資料.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "基本資料.郵政編碼",
  },
  {
    value: "基本資料.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.商業登記號碼",
  },
  {
    value: "基本資料.聯邦號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.聯邦號碼",
  },
  {
    value: "基本資料.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.會計聯繫人",
  },
  {
    value: "基本資料.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.電話號碼",
  },
  {
    value: "基本資料.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.電郵地址",
  },
  {
    value: "基本資料.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "基本資料.傳真號碼",
  },
  {
    value: "商業信息.業務類型",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.業務類型",
  },
  {
    value: "商業信息.公司成立的月/年",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.公司成立的月/年",
  },
  {
    value: "商業信息.預計月均銷售額",
    open: true,
    description: "選填",
    jsonObjKeyName: "商業信息.預計月均銷售額",
  },
  {
    value: "公司負責人資料.持有人",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.持有人",
  },
  {
    value: "公司負責人資料.電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.電話號碼",
  },
  {
    value: "公司負責人資料.家庭住址",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.家庭住址",
  },
  {
    value: "公司負責人資料.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.城市",
  },
  {
    value: "公司負責人資料.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.州",
  },
  {
    value: "公司負責人資料.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司負責人資料.郵政編碼",
  },
  {
    value: "銀行參考信息.銀行名稱",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行名稱",
  },
  {
    value: "銀行參考信息.銀行聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行聯絡人",
  },
  {
    value: "銀行參考信息.戶口號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.戶口號碼",
  },
  {
    value: "銀行參考信息.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.傳真號碼",
  },
  {
    value: "銀行參考信息.銀行地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.銀行地址",
  },
  {
    value: "銀行參考信息.城市",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.城市",
  },
  {
    value: "銀行參考信息.州",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.州",
  },
  {
    value: "銀行參考信息.郵政編碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "銀行參考信息.郵政編碼",
  },
  {
    value: "簽名確認.Name of Authorized Signer",
    open: true,
    description: "選填",
    jsonObjKeyName: "簽名確認.Name of Authorized Signer",
  },
  {
    value: "簽名確認.Authorized Signature",
    open: true,
    description: "選填",
    jsonObjKeyName: "簽名確認.Authorized Signature",
  },
  {
    value: "簽名確認.Date",
    open: true,
    description: "選填",
    jsonObjKeyName: "簽名確認.Date",
  },
  {
    value: "擔保人.擔保人簽名",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.擔保人簽名",
  },
  {
    value: "擔保人.擔保人名字",
    open: true,
    description: "必填，需要和擔保人簽名一致",
    jsonObjKeyName: "擔保人.擔保人名字",
  },
  {
    value: "擔保人.家庭地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.家庭地址",
  },
  {
    value: "擔保人.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.城市",
  },
  {
    value: "擔保人.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.州",
  },
  {
    value: "擔保人.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.郵政編碼",
  },
  {
    value: "擔保人.社會安全號",
    open: true,
    description:
      "必填，不能數字“9”開頭；不能數字“666”開頭；不能數字“000”開通；不能第4-5位數字為“00”；不能第6-9位數字為“0000”",
    jsonObjKeyName: "擔保人.社會安全號",
  },
  {
    value: "擔保人.駕駛執照號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.駕駛執照號碼",
  },
  {
    value: "擔保人.電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.電話號碼",
  },
  {
    value: "擔保人.職位",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.職位",
  },
  {
    value: "擔保人.日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "擔保人.日期",
  },
  {
    value: "分店信息.姓名",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.姓名",
  },
  {
    value: "分店信息.簽名",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.簽名",
  },
  {
    value: "分店信息.職位",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.職位",
  },
  {
    value: "分店信息.日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.日期",
  },
  // 分店一
  {
    value: "分店信息.分店一.第一分店商業登記名字",
    open: true,
    description: "必填，需與SAP餐館名一致",
    jsonObjKeyName: "分店信息.分店一.第一分店商業登記名字",
  },
  {
    value: "分店信息.分店一.餐館/實體地址",
    open: true,
    description: "必填，需與SAP餐館地址一致",
    jsonObjKeyName: "分店信息.分店一.餐館/實體地址",
  },
  {
    value: "分店信息.分店一.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店一.城市",
  },
  {
    value: "分店信息.分店一.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店一.州",
  },
  {
    value: "分店信息.分店一.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店一.郵政編碼",
  },
  {
    value: "分店信息.分店一.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.會計聯繫人",
  },
  {
    value: "分店信息.分店一.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.電話號碼",
  },
  {
    value: "分店信息.分店一.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.電郵地址",
  },
  {
    value: "分店信息.分店一.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.傳真號碼",
  },
  {
    value: "分店信息.分店一.其他聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.其他聯絡人",
  },
  {
    value: "分店信息.分店一.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店一.商業登記號碼",
  },

  // 分店二
  {
    value: "分店信息.分店二.第二分店商業登記名字",
    open: true,
    description: "必填，需與SAP餐館名一致",
    jsonObjKeyName: "分店信息.分店二.第二分店商業登記名字",
  },
  {
    value: "分店信息.分店二.餐館/實體地址",
    open: true,
    description: "必填，需與SAP餐館地址一致",
    jsonObjKeyName: "分店信息.分店二.餐館/實體地址",
  },
  {
    value: "分店信息.分店二.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店二.城市",
  },
  {
    value: "分店信息.分店二.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店二.州",
  },
  {
    value: "分店信息.分店二.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店二.郵政編碼",
  },
  {
    value: "分店信息.分店二.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.會計聯繫人",
  },
  {
    value: "分店信息.分店二.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.電話號碼",
  },
  {
    value: "分店信息.分店二.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.電郵地址",
  },
  {
    value: "分店信息.分店二.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.傳真號碼",
  },
  {
    value: "分店信息.分店二.其他聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.其他聯絡人",
  },
  {
    value: "分店信息.分店二.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店二.商業登記號碼",
  },

  // 分店三
  {
    value: "分店信息.分店三.第三分店商業登記名字",
    open: true,
    description: "必填，需與SAP餐館名一致",
    jsonObjKeyName: "分店信息.分店三.第三分店商業登記名字",
  },
  {
    value: "分店信息.分店三.餐館/實體地址",
    open: true,
    description: "必填，需與SAP餐館地址一致",
    jsonObjKeyName: "分店信息.分店三.餐館/實體地址",
  },
  {
    value: "分店信息.分店三.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店三.城市",
  },
  {
    value: "分店信息.分店三.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店三.州",
  },
  {
    value: "分店信息.分店三.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店三.郵政編碼",
  },
  {
    value: "分店信息.分店三.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.會計聯繫人",
  },
  {
    value: "分店信息.分店三.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.電話號碼",
  },
  {
    value: "分店信息.分店三.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.電郵地址",
  },
  {
    value: "分店信息.分店三.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.傳真號碼",
  },
  {
    value: "分店信息.分店三.其他聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.其他聯絡人",
  },
  {
    value: "分店信息.分店三.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店三.商業登記號碼",
  },

  // 分店四
  {
    value: "分店信息.分店四.第四分店商業登記名字",
    open: true,
    description: "必填，需與SAP餐館名一致",
    jsonObjKeyName: "分店信息.分店四.第四分店商業登記名字",
  },
  {
    value: "分店信息.分店四.餐館/實體地址",
    open: true,
    description: "必填，需與SAP餐館地址一致",
    jsonObjKeyName: "分店信息.分店四.餐館/實體地址",
  },
  {
    value: "分店信息.分店四.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店四.城市",
  },
  {
    value: "分店信息.分店四.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店四.州",
  },
  {
    value: "分店信息.分店四.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店四.郵政編碼",
  },
  {
    value: "分店信息.分店四.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.會計聯繫人",
  },
  {
    value: "分店信息.分店四.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.電話號碼",
  },
  {
    value: "分店信息.分店四.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.電郵地址",
  },
  {
    value: "分店信息.分店四.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.傳真號碼",
  },
  {
    value: "分店信息.分店四.其他聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.其他聯絡人",
  },
  {
    value: "分店信息.分店四.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店四.商業登記號碼",
  },

  // 分店五
  {
    value: "分店信息.分店五.第五分店商業登記名字",
    open: true,
    description: "必填，需與SAP餐館名一致",
    jsonObjKeyName: "分店信息.分店五.第五分店商業登記名字",
  },
  {
    value: "分店信息.分店五.餐館/實體地址",
    open: true,
    description: "必填，需與SAP餐館地址一致",
    jsonObjKeyName: "分店信息.分店五.餐館/實體地址",
  },
  {
    value: "分店信息.分店五.城市",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店五.城市",
  },
  {
    value: "分店信息.分店五.州",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店五.州",
  },
  {
    value: "分店信息.分店五.郵政編碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "分店信息.分店五.郵政編碼",
  },
  {
    value: "分店信息.分店五.會計聯繫人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.會計聯繫人",
  },
  {
    value: "分店信息.分店五.電話號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.電話號碼",
  },
  {
    value: "分店信息.分店五.電郵地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.電郵地址",
  },
  {
    value: "分店信息.分店五.傳真號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.傳真號碼",
  },
  {
    value: "分店信息.分店五.其他聯絡人",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.其他聯絡人",
  },
  {
    value: "分店信息.分店五.商業登記號碼",
    open: true,
    description: "選填",
    jsonObjKeyName: "分店信息.分店五.商業登記號碼",
  },
];

// 客户登记
export const CustomerRegistrationFormParams: ISearchParams[] = [
  {
    value: "公司名稱",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司名稱",
  },
  {
    value: "餐馆名字",
    open: true,
    description: "必填",
    jsonObjKeyName: "餐馆名字",
  },
  {
    value: "電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "電話號碼",
  },
  {
    value: "地址",
    open: true,
    description: "必填，填完整地址（街道+城市+州+郵編）需要和SAP餐館地址一致",
    jsonObjKeyName: "地址",
  },
  {
    value: "稅收ID號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "稅收ID號碼",
  },
  {
    value: "開業年限",
    open: true,
    description: "選填",
    jsonObjKeyName: "開業年限",
  },
  {
    value: "落場時間",
    open: true,
    description: "選填",
    jsonObjKeyName: "落場時間",
  },
  {
    value: "坐席數<位/席>",
    open: true,
    description: "選填",
    jsonObjKeyName: "坐席數<位/席>",
  },
  {
    value: "落貨位置",
    open: true,
    description: "選填",
    jsonObjKeyName: "落貨位置",
  },
  {
    value: "營業時間",
    open: true,
    description: "選填",
    jsonObjKeyName: "營業時間",
  },
  {
    value: "休息日",
    open: true,
    description: "選填",
    jsonObjKeyName: "休息日",
  },
  {
    value: "公司持有人全名",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司持有人全名",
  },
  {
    value: "公司持有人電話號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司持有人電話號碼",
  },
  {
    value: "公司持有人住址",
    open: true,
    description: "必填",
    jsonObjKeyName: "公司持有人住址",
  },
  {
    value: "簽名",
    open: true,
    description: "必填，需要和公司持有人全名一致",
    jsonObjKeyName: "簽名",
  },
  {
    value: "正寫名字",
    open: true,
    description: "必填，需要和公司持有人全名一致",
    jsonObjKeyName: "正寫名字",
  },
  {
    value: "日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "日期",
  },
];

// 送货免责声明
export const CustomerShippingDisclaimerParams: ISearchParams[] = [
  {
    value: "客戶姓名",
    open: true,
    description: "必填",
    jsonObjKeyName: "客戶姓名",
  },
  {
    value: "聯繫電話",
    open: true,
    description: "必填",
    jsonObjKeyName: "聯繫電話",
  },
  {
    value: "商鋪名稱",
    open: true,
    description: "必填，需和SAP資料一致",
    jsonObjKeyName: "商鋪名稱",
  },
  {
    value: "S.J.Distributors LLC 賬戶號碼",
    open: true,
    description: "必填，需和SAP資料一致",
    jsonObjKeyName: "S.J.Distributors LLC 賬戶號碼",
  },
  {
    value: "客戶經營場所地址",
    open: true,
    description: "必填，需和SAP資料一致",
    jsonObjKeyName: "客戶經營場所地址",
  },
  {
    value: "送貨至經營地址",
    open: true,
    description: "選填",
    jsonObjKeyName: "送貨至經營地址",
  },
  {
    value: "送貨至指定場所",
    open: true,
    description: "選填",
    jsonObjKeyName: "送貨至指定場所",
  },
  {
    value: "下貨位置",
    open: true,
    description: "選填",
    jsonObjKeyName: "下貨位置",
  },
  {
    value: "進場方式",
    open: true,
    description: "必填，可多选",
    jsonObjKeyName: "進場方式",
  },
  {
    value: "DATE",
    open: true,
    description: "必填，格式：月/日/年",
    jsonObjKeyName: "DATE",
  },
  {
    value: "日期",
    open: true,
    description: "必填，格式：月/日/年",
    jsonObjKeyName: "日期",
  },
  {
    value: "客戶簽名",
    open: true,
    description: "必填，需與客戶姓名一致",
    jsonObjKeyName: "客戶簽名",
  },
  {
    value: "簽名日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "簽名日期",
  },
];

// 银行卡付款
export const CustomerBankPaymentApplicationFormParams: ISearchParams[] = [
  {
    value: "授權人",
    open: true,
    description: "必填，僅英文",
    jsonObjKeyName: "授權人",
  },
  {
    value: "授權餐館名1",
    open: true,
    description: "必填，僅英文",
    jsonObjKeyName: "授權餐館名1",
  },
  {
    value: "授權餐館名2",
    open: true,
    description: "必填，僅英文",
    jsonObjKeyName: "授權餐館名2",
  },
  {
    value: "授權餐館名3",
    open: true,
    description: "選填，僅英文",
    jsonObjKeyName: "授權餐館名3",
  },
  {
    value: "授權餐館名",
    open: true,
    description: "需與SAP餐館名一致",
    jsonObjKeyName: "授權餐館名",
  },
  {
    value: "銀行卡類型",
    open: true,
    description: "必填，單選，和第三方接口結果一致",
    jsonObjKeyName: "銀行卡類型",
  },
  {
    value: "銀行卡類別",
    open: true,
    description: "必填，單選，和第三方接口結果一致",
    jsonObjKeyName: "銀行卡類別",
  },
  {
    value: "銀行卡號碼",
    open: true,
    description: "必填，16位數字",
    jsonObjKeyName: "銀行卡號碼",
  },
  {
    value: "有效日期",
    open: true,
    description: "必填，月/年",
    jsonObjKeyName: "有效日期",
  },
  {
    value: "卡後3位數",
    open: true,
    description: "必填",
    jsonObjKeyName: "卡後3位數",
  },
  {
    value: "銀行卡賬單地址",
    open: true,
    description: "必填",
    jsonObjKeyName: "銀行卡賬單地址",
  },
  {
    value: "持卡人姓名",
    open: true,
    description: "必填，與授權人一致",
    jsonObjKeyName: "持卡人姓名",
  },
  {
    value: "持卡人身份證號碼/駕駛證號碼",
    open: true,
    description: "必填",
    jsonObjKeyName: "持卡人身份證號碼/駕駛證號碼",
  },
  {
    value: "持卡人簽名",
    open: true,
    description: "必填，與授權人一致",
    jsonObjKeyName: "持卡人簽名",
  },
  {
    value: "日期",
    open: true,
    description: "必填",
    jsonObjKeyName: "日期",
  },
];

export enum UploadStateEnum {
  NoStart,
  Uploading,
  Success,
  Failed,
}

export enum IdentifyFileSectionType {
  OfficeDocument,
  FinancialNote,
  CardText,
}

export interface IModuleListSection {
  id: number;
  title: string;
  banner: string;
  description: string;
  name: string;
  departmentId: DepartNameEnum;
  type: IdentifyFileSectionType;
  createdBy: number;
  createdDate: string;
  lastModifiedDate: string;
}

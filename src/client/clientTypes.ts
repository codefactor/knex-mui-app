import React, { FunctionComponent } from "react";

export interface Field<T> {
  prop: keyof T;
  label: string;
  required?: boolean;
}

export interface ApplicationProps {
  open: boolean;
  onClose: () => void;
}

export interface BaseMenuItem {
  Icon?: any;
  primary: string;
  secondary?: string;
}

export interface ApplicationMenuItem extends BaseMenuItem {
  key: string;
  type: "application";
  Application: FunctionComponent<ApplicationProps>;
}

export interface SimpleMenuItem extends BaseMenuItem {
  key: string;
  type: "simple";
  Application: (evt: React.MouseEvent<any, any>) => void;
}

export interface MenuDivider {
  type: "divider";
}

export type MenuItem = SimpleMenuItem | ApplicationMenuItem | MenuDivider;

export interface ListProps {
  items: MenuItem[];
  ariaLabel: string;
}

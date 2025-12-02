export interface menuItem {
  icon: string;
  label: string;
  route?: string;
  children?: menuItem[];
}

export interface Status {
  name: string;
  value: string;
}

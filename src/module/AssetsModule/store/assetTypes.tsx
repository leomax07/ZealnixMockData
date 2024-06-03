export interface AssetType {
  id?: string;
  name?: string;
  assetId?: string;
  imageUrl?: string;
  hospitalId?: string;
  branchId?: string;
  assetCategoryId?: string;
}

export interface AssetItem {
  id?: string;
  assetItemId?: string;
  itemName?: string;
  inUseFrom?: string;
  status?: string;
  assetId?: string;
  assignedToId?: string;
  quantity: number;
}

export interface AssetHistory {
  id?: string;
  from?: string;
  to?: string;
  assetItemId?: string;
  assignedToId?: string;
}

export interface AssetMaintenances {
  id?:string;
  startDate?: string | Date;
  status?: string;
  reason?: string;
  endDate?: string | Date;
  assetItemId?: string;
  assetId?: string; 
  lastAssignedToId?: string;
  assignedToId?:string;
}

export interface AssetTypeInitialState {
  loading: boolean;
  error: string;
  assets: AssetType[];
  assetCategories: AssetType[];
  assetItem: AssetItem[];
  assetHistory: AssetHistory[];
  assetMaintenance: AssetMaintenances[];
}

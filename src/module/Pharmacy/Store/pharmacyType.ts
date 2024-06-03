export interface InventoryStockType {
  _id: string;
  image: string;
  drugId: string;
  name: string;
  manufacturer: string;
  category: string;
  totalStock: number;
}

export interface pharmacyStoreStateType {
  inventoryStockList: InventoryStockType[];
  loading: boolean;
  error: string;
}

export interface CreateDrugPayload {
  drugId: string;
  name: string;
  manufacturer: string;
  category: string;
  price: string;
}

export interface EditDrugPayload {
  id: string;
  drugId: string;
  name: string;
  manufacturer: string;
  category: string;
  price: string;
}

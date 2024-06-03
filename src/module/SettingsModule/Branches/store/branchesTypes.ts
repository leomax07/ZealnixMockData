export interface Branches {}

export interface GetAllBranchByHospitalIdType {
  hospitalId: string;
  search?: string;
}
export interface CreateBranchesByHospitalIDTypes {
  id?: string;
  branchID: string;
  name: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  status: string;
  email: string;
  phone: string;
  isMainBranch: boolean;
  hospitalId: string;
  createdBy?: string;
}
export const branchInitialState = {
  branchID: "",
  name: "",
  address: "",
  pinCode: "",
  city: "",
  state: "",
  country: "",
  status: "active",
  email: "",
  phone: "",
  isMainBranch: false,
  hospitalId: "",
};
export interface PatchBranchesTypes {
  id: string;
  branchID?: string;
  name?: string;
  address?: string;
  pinCode?: string;
  city?: string;
  state?: string;
  country?: string;
  status?: "active" | "inactive";
  email?: string;
  phone?: string;
  isMainBranch?: boolean;
  hospitalId?: string;
}

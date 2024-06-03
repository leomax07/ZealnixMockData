export interface CreateLabPayloadType {
  labID: string;
  name: string;
  status: string;
  departmentId: string;
  hospitalId: string;
  branchId: string;
}
export interface PatchLabPayloadType {
  id: string;
  labID?: string;
  name?: string;
  status?: string;
  departmentId?: string;
  hospitalId?: string;
  branchId?: string;
}
export interface GetLabsType {
  id: string;
  labID: string;
  name: string;
  status: string;
  department: string;
  hospital: string;
  branch: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabsInitialState {
  labs: GetLabsType[];
  loading: boolean;
  error: string;
}

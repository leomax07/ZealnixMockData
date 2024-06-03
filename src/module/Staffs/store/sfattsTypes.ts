export interface StaffDetail {
  profileImageUrl?: string, 
  name: string;
  type: string;
  departmentId: string;
  email: string;
  phone: string;
  dutyInTime: string | number;
  dutyOutTime: string | number;
  status: string;
  salt: string;
  designationId: string;
  hospitalId: string;
  branchId: string;
  department?: string | object | any;
}
export interface UpdateStaffDetail {
  id: string;
  name?: string;
  type?: string;
  departmentId?: string;
  email?: string;
  phone?: string;
  dutyInTime?: string | number;
  dutyOutTime?: string | number;
  status?: string;
  salt?: string;
  designationId?: string;
  hospitalId?: string;
  branchId?: string;
  department?: string | object | any;
}

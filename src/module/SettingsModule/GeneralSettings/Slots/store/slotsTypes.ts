export interface CreateSlotsPayload {
  appointmentRangeStart: number;
  appointmentRangeEnd: number;
  regularSlot: number;
  emergencySlot: number;
  videoSlot: number;
  doctorIds: string[];
  hospitalId: string;
  branchId: string;
}

export interface EditSlotProps {
  id?: string;
  appointmentRangeStart: string | any;
  appointmentRangeEnd: string | any;
  regularSlot: number;
  emergencySlot: number;
  videoSlot: number;
  doctorIds: string[];
  hospitalId: string;
  branchId: string;
}

export interface SlotType {
  id?: string;
  appointmentRangeStart: number;
  appointmentRangeEnd: number;
  regularSlot: number;
  emergencySlot: number;
  videoSlot: number;
  doctorIds: string[];
}

export interface SlotResponseType {
  id: string;
  appointmentRangeStart: number;
  appointmentRangeEnd: number;
  regularSlot?: number;
  videoSlot?: number;
  emergencySlot?: number;
  createdAt?: string;
  updatedAt?: string;
  doctorIds: string[];
  createdById: string;
  updatedById?: string;
  hospitalId: string;
  branchId: string;
  doctors?: Doctor[];
}

export interface Doctor {
  id: string;
  employeeId: string;
  name: string;
  type: string;
  dateOfBirth?: string;
  email: string;
  dutyInTime: number;
  dutyOutTime: number;
  status: string;
  phone: string;
  hospitalId: string;
  branchId: string;
  departmentId: string;
  designationId: string;
  createdBy?: string;
  createdAt: string;
  additionalProp1?: AdditionalProp1;
  profileImageUrl?: string;
  salt?: string;
  department: Department;
}

export interface Department {
  id: string;
  name: string;
  status: string;
  hospitalId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdditionalProp1 {}

export interface CreateAppointmentPayload {
  phone?: string;
  id?: string;
  type: string;
  doctorId: string;
  patientId: string;
  patientContact: string;
  patientEmail: string;
  appointmentDate: string;
  title: string;
  notes: string;
  status: string;
  hospitalId?: string;
  doctor?: object;
  hospital?: object;
  patient?: object;
  appointmentScheduleId: string;
}

export interface PatchAppointmentStatusPayload{
  id: string,
  status: string;
}

export interface AddAppointmentStateType {
  appointmentDate: string | Date;
  phone?: string;
  id?: string;
  type: string;
  doctorId: string;
  patientId: string;
  patientContact: string;
  patientEmail: string;
  appointmentStart?: string;
  appointmentEnd?: string;
  title: string;
  notes: string;
  status: string;
  hospitalId?: string;
  doctor?: object;
  hospital?: object;
  patient?: object;
  appointmentScheduleId: string;
  department?: object;
  appointmentSchedule?: object;
  _id?: string;
}
export interface AppointmentBySlotIdType {
  _id: string;
  type: string;
  hospitalId: string;
  patientId: string;
  doctorId: string;
  patientContact: string;
  patientEmail: string;
  title: string;
  notes: string;
  createdAt: string;
  status: string;
  bookedVia: string;
  updatedAt: string;
  tokenId: string;
  appointmentDate: string;
  appointmentScheduleId: string;
  appointmentSchedule: AppointmentSchedule;
  patient: Patient;
  id: string;
}

export interface AppointmentSchedule {
  _id?: string;
  appointmentRangeStart?: number;
  appointmentRangeEnd?: number;
  regularSlot: number;
  emergencySlot: number;
  videoSlot: number;
  createdAt?: string;
  updatedAt?: string;
  doctorIds?: string[];
  hospitalId?: string;
  branchId?: string;
}

export interface Patient {
  _id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  hash: string;
  isMobileAppLoginEnabled: boolean;
  weightInKg: number;
  heightInCm: number;
  bloodGroup: string;
  phone: string;
  maritalStatus: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  profilePicUrl: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  takingMedicationsCurrently: boolean;
  currentMedicationsDescription: string;
  reasonForVisit: string;
  drugAllergies: string;
  illnessHistory: string[];
  surgeryHistory: SurgeryHistory[];
  exerciseHabit: string;
  dietStyle: string;
  alcoholConsumption: string;
  caffeineConsumption: string;
  smokingHabit: string;
  medicalHistoryComments: string;
  status: string;
  hospitalId: string;
  branchId: string;
  createdBy: string;
}

export interface SurgeryHistory {
  index: number;
  operationName: string;
  operationDate: string;
}

export interface PatientType {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  password: string;
  email: string;
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
  illnessHistory?: string[] | null;
  surgeryHistory?: string[] | null;
  exerciseHabit: string;
  dietStyle: string;
  alcoholConsumption: string;
  caffeineConsumption: string;
  smokingHabit: string;
  medicalHistoryComments: string;
  status: string;
  hospitalId: string;
  createdBy: string;
  branchId: string;
}

export interface PatientPayload {
  type: string;
  payload: PatientType;
}
export interface PatientFilter {
  offset?: number;
  limit?: number;
  skip?: number;
  order?: string;
  where: Where;
  fields?: Fields;
}
export interface Where {
  status?: string;
  hospitalId: string;
  branchId: string;
}
export interface Fields {
  id: boolean;
  name: boolean;
  gender: boolean;
  dateOfBirth: boolean;
  email: boolean;
  weightInKg: boolean;
  heightInCm: boolean;
  bloodGroup: boolean;
  phone: boolean;
  maritalStatus: boolean;
  address: boolean;
  pinCode: boolean;
  city: boolean;
  state: boolean;
  country: boolean;
  profilePicUrl: boolean;
  emergencyContactName: boolean;
  emergencyContactPhone: boolean;
  emergencyContactRelationship: boolean;
  takingMedicationsCurrently: boolean;
  currentMedicationsDescription: boolean;
  reasonForVisit: boolean;
  drugAllergies: boolean;
  illnessHistory: boolean;
  surgeryHistory: boolean;
  exerciseHabit: boolean;
  dietStyle: boolean;
  alcoholConsumption: boolean;
  caffeineConsumption: boolean;
  smokingHabit: boolean;
  medicalHistoryComments: boolean;
  status: boolean;
  hospitalId: boolean;
  branchId: boolean;
  createdBy: boolean;
  createdAt: boolean;
  updatedAt: boolean;
}

export interface VitalsType {
  temperature: number;
  id: string;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  bloodSugar: number;
  weight: number;
  height: number;
  appointmentId: string;
  patientId: string;
}

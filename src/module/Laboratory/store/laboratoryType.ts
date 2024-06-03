export interface LaboratoryType {
  id?: string;
  type: string;
  departmentId: string;
  testDateAndTime: string;
  illness: string;
  reportFileUrl: string[];
  status: string;
  notes?: string;
  patientId: string;
  labTechnicianId: string;
  headDoctorId: string;
  labId: string;
  hospitalId: string;
  branchId: string;
}

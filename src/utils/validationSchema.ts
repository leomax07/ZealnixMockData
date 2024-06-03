import * as Yup from "yup";

export const patientSchema = Yup.object({
  name: Yup.string().min(4).required("Name is Required"),
  email: Yup.string().email().required("Email is Required"),
  gender: Yup.string().required("Gender is Required"),
  phone: Yup.string().min(7).required("Phone Number is Required"),
  address: Yup.string().required("Address is Required"),
  emergencyContactPhone: Yup.string()
    .min(7)
    .required("Contact Number is Required"),
  dateOfBirth: Yup.string().required("DOB is Required"),
  bloodGroup: Yup.string().required("Blood Group is Required"),
});

export const labReportSchema = Yup.object({
  patientId: Yup.string().required("Patient is Required"),
  labTechnicianId: Yup.string().required("Lab Technician is Required"),
  testDateAndTime: Yup.string().required("Date is Required"),
  illness: Yup.string().required("Illness is Required"),
  headDoctorId: Yup.string().required("Doctor is Required"),
  departmentId: Yup.string().required("Department is Required"),
});

export const scratchpadSchema = Yup.object({
  title: Yup.string().required("title is Required"),
  type: Yup.string().required("type is Required"),
});

export const slotSchema = Yup.object({
  appointmentRangeStart: Yup.string().required("Start Time is Required"),
  appointmentRangeEnd: Yup.string().required("End Time is Required"),
  regularSlot: Yup.number().required("Regular Slot is Required"),
  emergencySlot: Yup.number().required("Emergency Slot is Required"),
  videoSlot: Yup.number().required("Video Slot is Required"),
}).test(function check(values) {
  const { regularSlot, emergencySlot, videoSlot } = values;
  const zeroSlotsCount = [regularSlot, emergencySlot, videoSlot].filter(
    (slot) => slot === 0
  ).length;
  if (zeroSlotsCount > 1) {
    return this.createError({
      message: "only one slot must be zero",
      path: "regularSlot",
    });
  }
  return true;
});

export const branchSchema = Yup.object({
  name: Yup.string().required("Branch Name is Required"),
  branchID: Yup.string().required("ID is Required"),
  address: Yup.string().required("Address is Required"),
  email: Yup.string().required("Email is Required"),
  phone: Yup.string().required("Phone is Required"),
});

export const labSchema = Yup.object({
  name: Yup.string().required("Lab Name is Required"),
  labID: Yup.string().required("Lab ID is Required"),
  departmentId: Yup.string().required("Department is Required"),
});

export const appointmentSchema = Yup.object({
  patientId: Yup.string().required("Patient Name is Required"),
  type: Yup.string().required("Appointment Type is Required"),
  doctorId: Yup.string().required("Doctor is Required"),
  title: Yup.string().required("Appointment Title is Required"),
});

export const assetSchema = Yup.object({
  name: Yup.string().required("Asset Name is Required"),
  assetCategoryId: Yup.string().required("Asset Category is Required"),
});
export const BranchValidationSchema = Yup.object({
  name: Yup.string().required("Branch Name is Required"),
  address: Yup.string().required("Address is Required"),
  email: Yup.string().email().required("Email is Required"),
  phone: Yup.number().min(7).required("Phone Number is Required"),
});

export const StaffValidationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  type: Yup.string().required("Type is Required"),
  departmentId: Yup.string().required("Department is Required"),
  email: Yup.string().email().required("Email is Required"),
  phone: Yup.number().required("phone is Required"),
  designationId: Yup.string().required("Designation is Required"),
  dutyInTime: Yup.string().required("Duty In Time is Required"),
  dutyOutTime: Yup.string().required("Duty Out Time is Required"),
});

export const pharmacyInventoryValidationSchema = Yup.object({
  drugId: Yup.string().required("Drug ID is Required"),
  name: Yup.string().required("Drug Name is Required"),
  manufacturer: Yup.string().required("Manufacturer is Required"),
});

export const AssetItemSchema = Yup.object({
  itemName: Yup.string().required("Name is Required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .moreThan(0, "Quantity must be greater than 0"),
});

export const EditAssetItemSchema = Yup.object({
  itemName: Yup.string().required("Name is Required"),
});

export const AssetMaintenanceSchema = Yup.object({
  startDate: Yup.string().required("Start Date is Required"),
  endDate: Yup.string().required("End Date is Required"),
  reason: Yup.string().required("Reason is Required"),
});

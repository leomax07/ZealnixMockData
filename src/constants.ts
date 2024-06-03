import * as Yup from "yup";

// base url
export const BASE_URL = "https://api-dev.garudahealth.ai";

// token string
export const TOKEN = "token";
export const DEFAULT_TOKEN_EXPIRY_DAY = 1;
export const REMEMBER_ME_EXPIRY_DAYS = 365;

// for appointments
export const BOOKED_VIA = "web";

// default ids used for now
export const HOSPITAL_ID = "6450eab2c9980f24b5af7d7b";
export const BRANCH_ID = "6458792b9233bc99ebaf9163";
export const SUPER_ADMIN = "644d3737e07b0e5122204f8c";

// patient types
export const IN_PATIENT_STATUS = "in_patient";
export const OUT_PATIENT_STATUS = "out_patient";

export const SORT_BY_CREATEDAT_DESC = "createdAt DESC";

// status
export const ENABLED = "active";
export const DISABLED = "inactive";

// appointment types
export const STATUS = ["Active", "Inactive", "Completed"];
export const SCRATCHPAD_TYPE = ["personal", "web"];

export const APPOINTMENT_TYPES = ["regular", "emergency", "video"];

// active statuses
export const ACTIVE_STATUSES = ["Active", "active", "in_patient"];
export const INACTIVE_STATUSES = ["Inactive", "inactive", "out_patient"];
export const COMPLETED_STATUSES = ["Completed", "completed"];
export const PENDING_STATUSES = ["Pending", "pending"];

export const STAFF_TOOLTIP_MSG = "Click to open staff Profile";
// days of week
export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// PAGINATION
export const ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
// staff types array
export const STAFF_TYPE = [
  { value: "admin", label: "Admin" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse " },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "lab_technician", label: "Lab Technician" },
  { value: "accounts", label: "Accounts" },
  { value: "others", label: "Others" },
];

export const APPOINTMENT_STAT_WEEK = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};
export const MONTHS_OF_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// staff type string
export const DOCTOR = "doctor";

// staff type strings
export const PHARMACIST = "pharmacist";
export const NURSE = "nurse";

export const LATEST_PATIENTS = [
  {
    id: "1234",
    date: new Date().toString(),
    name: "Jhon Brown",
    age: "23",
    gender: "male",
    status: "admitted",
  },
  {
    id: "1234",
    date: new Date().toString(),
    name: "Jhon Brown",
    age: "23",
    gender: "male",
    status: "admitted",
  },
  {
    id: "1234",
    date: new Date().toString(),
    name: "Jhon Brown",
    age: "23",
    gender: "male",
    status: "admitted",
  },
  {
    id: "1234",
    date: new Date().toString(),
    name: "Jhon Brown",
    age: "23",
    gender: "male",
    status: "admitted",
  },
];

export const routes = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  SIGNUP_SUCCESS: "/signup/success",
};

export const API = {
  APPOINTMENTS: "/appointments",
  APPOINTMENTS_CALENDAR: "/appointments-calendar",
  APPOINTMENT_COUNT_DASHBOARD: "/dashboard/count/appointments",
  APPOINTMENT_TYPE_GRAPH: "/dashboard/graph/appointment-statistics",
  PATIENT_COUNT_DASHBOARD: "/dashboard/count/patients",
  PATIENT_GENDER: "/dashboard/count/patient/gender-statistics",
  BRANCHES: "/branches",
  DASHBOARD_PATIENT_BAR_CHART: "/dashboard/graph/patients",
  DASHBOARD_IN_OUT_PATIENT_BAR_CHART: "/dashboard/graph/patient-breakdown",
  DESIGNATIONS: "/designations",
  DEPARTMENTS: "/departments",
  HOSPITALS: "/hospitals",
  LABS: "/labs",
  LABORATORY: "/lab-reports",
  PATIENTS: "/patients",
  STAFFS: "/users",
  LAB_REPORT: "/lab-reports",
  LOGIN: "/users/login",
  CURRENT_USER: "/current-user",
  VITALS: "/vitals",
  SCRATCHPAD: "/scratchpad",
  APPOINTMENT_SHEDULE: "/appointment-schedules",
  APPOINTMENT_SLOTS: "/appointments/slots",
  FILES: "/files",
  ASSETS: "/assets",
  ASSETS_CATEGORIES: "/asset-categories",
  ASSETS_ITEMS: "/asset-items",
  ASSETS_HISTORIES: "/asset-histories",
  ASSETS_MAINTENANCES: "/asset-maintenances",
  PHARMACY_DRUG: "/pharmacy-drugs",
  PHARMACY_DRUG_STOCK: "/pharmacy/drugs/stocks",
};

export const SCRATCH_TABS = [
  {
    label: "All Notes",
    index: 0,
    to: "",
  },
  {
    label: "Personal",
    index: 1,
    to: "",
  },
  {
    label: "Work",
    index: 2,
    to: "",
  },
];

export const STAFFS_TABS = [
  {
    label: "Doctors",
    to: "/staffs/doctor",
    index: "doctor",
  },
  {
    label: "Nurses",
    to: "/staffs/nurse",
    index: "nurse",
  },
  {
    label: "Pharmacist",
    to: "/staffs/pharmacist",
    index: "pharmacist",
  },
  {
    label: "Lab Technicians",
    to: "/staffs/lab_technician",
    index: "lab_technician",
  },
  {
    label: "Others",
    to: "/staffs/others",
    index: "others",
  },
];

// staff details tab data
export const STAFF_DETAILS_TABS = (type: string, id: string) => [
  {
    label: "Overview",
    to: `/staffs/${type}/${id}`,
    index: 0,
  },
  {
    label: "Appointments",
    to: `/staffs/${type}/${id}/appointments`,
    index: 1,
  },
  /* {
			label: "Diagnosis",
			to: `/staffs/${type}/${id}/diagnosis`,
			index: 2,
		}, */
  {
    label: "Reports",
    to: `/staffs/${type}/${id}/reports`,
    index: 3,
  },
  /* {
			label: "Reviews",
			to: `/staffs/${type}/${id}/reviews`,
			index: 4,
		}, */
  {
    label: "General Info",
    to: `/staffs/${type}/${id}/generalinfo`,
    index: 5,
  },
];

export const LABORATORY_TABS = [
  {
    label: "X-Ray",
    to: "/laboratory/x-ray",
    index: 0,
    labId: "64635673c3883c14574fe727",
  },
  {
    label: "CT-Scan",
    to: "/laboratory/ct-scan",
    index: 1,
    labId: "6463568bc3883c14574fe728",
  },
  {
    label: "MRI",
    to: "/laboratory/MRI",
    index: 2,
    labId: "646356b1c3883c14574fe729",
  },
];

export const APPOINTMENT_TAB_OPTIONS = [
  {
    label: "Doctors Allocation",
    to: "/appointments/appointments_calendar",
    index: 0,
  },
  // {
  // 	label: "All Appointments",
  // 	to: "/appointments/all_appointments",
  // 	index: 1,
  // },
];

export const HOURS_OF_DAY = [
  { hour: 0, label: "12:00 am" },
  { hour: 1, label: "1:00 am" },
  { hour: 2, label: "2:00 am" },
  { hour: 3, label: "3:00 am" },
  { hour: 4, label: "4:00 am" },
  { hour: 5, label: "5:00 am" },
  { hour: 6, label: "6:00 am" },
  { hour: 7, label: "7:00 am" },
  { hour: 8, label: "8:00 am" },
  { hour: 9, label: "9:00 am" },
  { hour: 10, label: "10:00 am" },
  { hour: 11, label: "11:00 am" },
  { hour: 12, label: "12:00 pm" },
  { hour: 13, label: "1:00 pm" },
  { hour: 14, label: "2:00 pm" },
  { hour: 15, label: "3:00 pm" },
  { hour: 16, label: "4:00 pm" },
  { hour: 17, label: "5:00 pm" },
  { hour: 18, label: "6:00 pm" },
  { hour: 19, label: "7:00 pm" },
  { hour: 20, label: "8:00 pm" },
  { hour: 21, label: "9:00 pm" },
  { hour: 22, label: "10:00 pm" },
  { hour: 23, label: "11:00 pm" },
  { hour: 24, label: "12:00 pm" },
];

export const stepperOptions = [
  {
    index: 1,
    label: "patient information",
  },
  {
    index: 2,
    label: "medical history",
  },
  {
    index: 3,
    label: "Mobile App Login",
  },
];

// patient admission form
export const DISEASE_LIST = [
  {
    index: 0,
    label: "Heart Failure",
    checked: false,
  },
  {
    index: 1,
    label: "Diabetes",
    checked: false,
  },
  {
    index: 2,
    label: "Angina",
    checked: false,
  },
  {
    index: 3,
    label: "CVD",
    checked: false,
  },
  {
    index: 4,
    label: "Cholesterol",
    checked: false,
  },
  {
    index: 5,
    label: "Hypertension",
    checked: false,
  },
  {
    index: 6,
    label: "Depression",
    checked: false,
  },
  {
    index: 7,
    label: "Depression",
    checked: false,
  },
  {
    index: 8,
    label: "Depression",
    checked: false,
  },
];

export interface HabitListTypes {
  index: number;
  label: string;
  checked?: string;
  name: string;
  options: string[];
}

export interface HabitData {
  exerciseHabit?: string;
  dietStyle?: string;
  alcoholConsumption?: string;
  caffeineConsumption?: string;
  smokingHabit?: string;
}

export interface OperationList {
  index: number;
  operationName: string;
  operationDate: string;
}

export interface OperationListType {
  index: number;
  operationName: string;
  operationDate: string;
}

export interface MedicalHistoryType {
  reasonForVisit: string;
  drugAllergies: string;
  illnessHistory: string[];
  surgeryHistory: OperationListType[];
  exerciseHabit: string;
  dietStyle: string;
  alcoholConsumption: string;
  caffeineConsumption: string;
  smokingHabit: string;
  medicalHistoryComments: string;
}

export const HABBITS_LIST = [
  {
    index: 0,
    label: "Excercise",
    checked: "",
    name: "exerciseHabit",
    options: [
      "never",
      "two_three_days_a_week",
      "three_five_days_a_week",
      "more_than_five_days_a_week",
    ],
  },
  {
    index: 1,
    label: "Following a Diet",
    checked: "",
    name: "dietStyle",
    options: ["loose_diet", "strict_diet", "no_diet_plan"],
  },
  {
    index: 2,
    label: "Alcohol Consumption",
    name: "alcoholConsumption",
    options: ["never", "moderate", "frequent"],
  },
  {
    index: 3,
    label: "Caffeine Consumption",
    name: "caffeineConsumption",
    options: ["never", "moderate", "frequent"],
  },
  {
    index: 4,
    label: "Smoking",
    name: "smokingHabit",
    options: ["never", "moderate", "frequent", "chain_smoker"],
  },
];

export const PATIENT_DETAIL = {
  name: "Abi ram",
  profilePic:
    "data:image/png;base64,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",
  age: 24,
  sex: "female",
  PatientType: "inPatient",
  bloodGroup: "B +ve",
  bloodPressure: "normal",
  bloodSugar: "normal",
  department: "orthopedics",
  lastVist: "Wed Mar 22 2023 15:47:58 GMT+0530 (India Standard Time)",
  email: "adasd@sda.com",
  phone: "+678888888 , +345343434",
  weight: "56 kgs",
  height: "5'11''",
  maritalStatus: "single",
  address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  emergencyContactName: "Jhon (uncle)",
  emergencyContactNumber: "+8677676677",
};

export const PHARMACY_TAB_OPTIONS = [
  {
    label: "Inventory",
    index: 0,
    to: "/pharmacy/inventory",
  },
  {
    label: "Sales",
    index: 1,
    to: "/pharmacy/sales",
  },
  {
    label: "Purchases",
    index: 2,
    to: "/pharmacy/purchases",
  },
  {
    label: "Delivery management",
    index: 3,
    to: "/pharmacy/delivery",
  },
  {
    label: "Token Management",
    index: 4,
    to: "/pharmacy/tokenmanagement",
  },
];

export const MASTERS_TAB_OPTIONS = [
  {
    label: "Designations",
    to: "/settings/masters/designations",
    index: 0,
  },
  {
    label: "Departments",
    to: "/settings/masters/departments",
    index: 1,
  },
  {
    label: "Labs",
    to: "/settings/masters/labs",
    index: 2,
  },
  {
    label: "Others",
    to: "/settings/masters/others",
    index: 3,
  },
];

export const PHARMACY_STOCK_DATA = [
  {
    profileUrl: "",
    name: "Abiram",
    drugId: "2Fa-33",
    batchId: "2Fa-33",
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
    category: "general",
    patientName: "Abiram",
    date: new Date().toISOString(),
    bookedVia: "App",
    status: "active",
    manufacturer: "Hologic Inc",
    inStock: 50,
    unitPrice: 2,
    soldLast30Days: 3000,
    stock: 3000,
    totalAmount: 22.33,
    quantity: 3000,
    sold: 34,
    pincodes: "641046, 641056",
    noOfOrders: 12,
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
  },
  {
    profileUrl: "",
    name: "Abiram 2",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 2",
    date: new Date().toISOString(),
    bookedVia: "kiosk",
    status: "inactive",
    manufacturer: "GE Healthcare",
    inStock: 80,
    unitPrice: 21,
    soldLast30Days: 1000,
    stock: 4000,
    totalAmount: 22.33,
    quantity: 4000,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram 3",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 3",
    date: new Date().toISOString(),
    bookedVia: "Admin",
    status: "active",
    manufacturer: "Essilor",
    inStock: 10,
    unitPrice: 33,
    soldLast30Days: 383,
    stock: 2300,
    totalAmount: 22.33,
    quantity: 2300,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram",
    drugId: "2Fa-33",
    batchId: "2Fa-33",
    category: "general",
    patientName: "Abiram",
    date: new Date().toISOString(),
    bookedVia: "App",
    status: "active",
    manufacturer: "Hologic Inc",
    inStock: 50,
    unitPrice: 2,
    soldLast30Days: 3000,
    stock: 3000,
    totalAmount: 22.33,
    quantity: 3000,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram 2",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 2",
    date: new Date().toISOString(),
    bookedVia: "kiosk",
    status: "inactive",
    manufacturer: "GE Healthcare",
    inStock: 80,
    unitPrice: 21,
    soldLast30Days: 1000,
    stock: 4000,
    totalAmount: 22.33,
    quantity: 4000,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram 3",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 3",
    date: new Date().toISOString(),
    bookedVia: "Admin",
    status: "active",
    manufacturer: "Essilor",
    inStock: 10,
    unitPrice: 33,
    soldLast30Days: 383,
    stock: 2300,
    totalAmount: 22.33,
    quantity: 2300,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram",
    drugId: "2Fa-33",
    batchId: "2Fa-33",
    category: "general",
    patientName: "Abiram",
    date: new Date().toISOString(),
    bookedVia: "App",
    status: "active",
    manufacturer: "Hologic Inc",
    inStock: 50,
    unitPrice: 2,
    soldLast30Days: 3000,
    stock: 3000,
    totalAmount: 22.33,
    quantity: 3000,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram 2",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 2",
    date: new Date().toISOString(),
    bookedVia: "kiosk",
    status: "inactive",
    manufacturer: "GE Healthcare",
    inStock: 80,
    unitPrice: 21,
    soldLast30Days: 1000,
    stock: 4000,
    quantity: 4000,
    totalAmount: 22.33,
    noOfOrders: 12,
    pincodes: "641046, 641056",
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    sold: 34,
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
  {
    profileUrl: "",
    name: "Abiram 3",
    drugId: "2Fa-34",
    batchId: "2Fa-34",
    category: "general",
    patientName: "Abiram 3",
    date: new Date().toISOString(),
    bookedVia: "Admin",
    status: "active",
    manufacturer: "Essilor",
    inStock: 10,
    unitPrice: 33,
    soldLast30Days: 383,
    stock: 2300,
    quantity: 2300,
    sold: 34,
    noOfOrders: 12,
    totalAmount: 22.33,
    riderId: "12e370001",
    address: "14231 Woodview Ln, Saratoga, CA, 95070",
    pincodes: "641046, 641056",
    branchId: "2Fa-33",
    email: "abiram@gmail.com",
    phone: "9790440471",
  },
];

// Static  Dropdown Options

export const genderOptions = ["male", "female", "others"];
export const bloodOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const marraigeStatusOptions = [
  "married",
  "single",
  "divorced",
  "separated",
  "widowed",
  "registered partnership",
  "never married",
];
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const ILLNESS_HISTORY = [
  "cancer",
  "cardiovascular disease",
  "chronic obstructive pulmonary disease",
  "stroke",
  "diabetes",
  "hypertension",
  "kidney disease",
  "liver disease",
  "Alzheimer's disease",
  "Parkinson's disease",
  "multiple sclerosis",
  "HIV/AIDS",
  "rheumatoid arthritis",
  "Crohn's disease",
  "ulcerative colitis",
  "lupus",
  "depression",
  "anxiety",
  "bipolar disorder",
  "schizophrenia",
];

export const relationShip = [
  "father",
  "mother",
  "sister",
  "brother",
  "husband",
  "wife",
  "son",
  "daughter",
  "grandparent",
  "legal_guardian",
];

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
});

export const labReportSchema = Yup.object({
  patientId: Yup.string().required("Patient is Required"),
  labTechnicianId: Yup.string().required("Lab Technician is Required"),
  testDateAndTime: Yup.string().required("Date is Required"),
  illness: Yup.string().required("Illness is Required"),
  headDoctorId: Yup.string().required("Doctor is Required"),
  departmentId: Yup.string().required("Department is Required"),
});

export interface Designation {
  name: string;
  createdBy: string;
  createdAt: string;
  status: string;
}

export interface DesignationType {
  id: string;
  name: string;
  status: string;
  branch: string;
  hospital: string;
  createdBy: string;
}

export interface PatchDesignationType {
  id?: string;
  name?: string;
  status?: string;
  branch?: string;
  hospital?: string;
  createdBy?: string;
}

export interface CreateDesignation {
  name: string;
  status: string;
  hospitalId: string;
}

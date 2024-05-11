export interface Customer {
    id: number;
    address: any[]; // You can define a more specific type for address if needed
    bank_id: Bank[];
    payment_terms: any; // You can define a more specific type if needed
    logs: Log[];
    login_access: boolean;
    name: string;
    company_name: string;
    mobile_no: string;
    telephone_no: string;
    whatsapp_no: string;
    email: string;
    remark: string;
    date_of_birth: string; // Consider using Date type if applicable
    anniversary_date: string; // Consider using Date type if applicable
    gst_type: string;
    gstin: string;
    pan_no: string;
    apply_tds: boolean;
    credit_limit: number;
    opening_balance: number;
    opening_balance_type: string;
    membership: any; // You can define a more specific type if needed
    is_active: boolean;
    userid: number;
    account: number;
  }
  
  interface Bank {
    id: number;
    logs: Log[];
    bank_ifsc_code: string;
    bank_name: string;
    branch_name: string;
    account_no: string;
    account_holder_name: string;
    is_active: boolean;
  }
  
  interface Log {
    id: number;
    modal_type: string;
    operation_type: string;
    modal_id: number;
    userid: string;
    date_time: string; // Consider using Date type if applicable
  }